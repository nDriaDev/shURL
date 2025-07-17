import express from "express";
import compression from 'compression';
import path from 'path';
import * as url from 'url';
import cookieParser from 'cookie-parser';
import DbClient from "./services/database/DbClient.js";
import MongoDbClient from "./services/database/MongoDbClient.js";
import Process from "./common/Process.js";
import routing from "./routes/routes.js";
import CONSTANTS from "./utils/constants.js";
import LogUtil from "./utils/logUtil.js";
import HeadersUtils from "./utils/headersUtils.js";
import helmet from "helmet";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const {DEV: DEV_PATH, PROD:PROD_PATH} = CONSTANTS.PATHS.FE_ROOT_STATIC_FILE;
const IS_DEV = process.env.NODE_ENV === CONSTANTS.ENVIRONMENT.DEV;

const pathStaticFile = IS_DEV ? DEV_PATH : PROD_PATH;

const dbClient = new DbClient(new MongoDbClient(IS_DEV));
const app = express();

LogUtil.init(app);

!IS_DEV && app.set('trust proxy', true);
!IS_DEV && app.disable('x-powered-by');

app.use(compression());
app.use(express.json({
	type: [
		'application/json',
		'application/csp-report',
		'application/reports+json',
	]
}));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(helmet({
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'", "data:"]
		}
	}
}));

app.use(express.static(
	path.join(__dirname, pathStaticFile), {
		setHeaders: HeadersUtils.setRelAndReportToHeaders
	}
));

routing(app, express, dbClient);

const Processor = new Process();

app.listen(process.env.PORT || 3000, () =>
	dbClient.connect()
		.then(()=>
			Processor.schedule(()=>
				dbClient.disconnect()
			))
		.catch(LogUtil.error)
		.finally(()=>
			LogUtil.log(`RUNNING on ${process.env.PORT}...`)
		)
);
