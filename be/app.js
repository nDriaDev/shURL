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
import DetaDbClient from "./services/database/DetaDbClient.js";
import HeadersUtils from "./utils/headersUtils.js";
import helmet from "helmet";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const {NODE_ENV, PORT} = process.env;

const {DEV, DETA_SH, PROD} = CONSTANTS.ENVIRONMENT;
const {DEV: DEV_PATH, PROD:PROD_PATH, DETA_SH:DETA_PATH} = CONSTANTS.PATHS.FE_ROOT_STATIC_FILE;

const dbClientImpl = NODE_ENV === DEV ? new MongoDbClient() : NODE_ENV === DETA_SH ? new DetaDbClient() : null;
const dbClient = new DbClient(dbClientImpl);

const app = express();

LogUtil.init(app);

NODE_ENV !== DEV && app.set('trust proxy', true);
app.use(compression());
app.use(express.json({type: [
		'application/json',
		'application/csp-report',
		'application/reports+json',
	]}));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(helmet({
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'", "data:"]
		}
	}
}));

const pathStaticFile = NODE_ENV === CONSTANTS.ENVIRONMENT.DEV ? DEV_PATH : NODE_ENV === CONSTANTS.ENVIRONMENT.DETA_SH ? DETA_PATH : PROD_PATH;
app.use(express.static(path.join(__dirname, pathStaticFile), {
	setHeaders: HeadersUtils.setRelAndReportToHeaders
}));

routing(app, express, dbClient);

if(NODE_ENV === DEV) {
	const Processor = new Process();

	app.listen(PORT, () =>
		dbClient.connect()
			.then(()=>
				Processor.schedule(()=>
					dbClient.disconnect()
				))
			.catch(LogUtil.error)
			.finally(()=>
				LogUtil.log(`RUNNING on ${PORT}...`)
			)
	);
}

if(NODE_ENV === DETA_SH) {
	app.listen(PORT || 3000, () =>
		LogUtil.log(`RUNNING on ${PORT}...`)
	)
}
