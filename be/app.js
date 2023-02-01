import express from "express";
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

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const {DEV, DETA_SH, PROD} = CONSTANTS.ENVIRONMENT;
const dbClientImpl = process.env.NODE_ENV === DEV ? new MongoDbClient() : process.env.NODE_ENV === DETA_SH ? new DetaDbClient() : null;
const dbClient = new DbClient(dbClientImpl);

const app = express();

LogUtil.init(app);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

const {DEV: DEV_PATH, PROD:PROD_PATH, DETA_SH:DETA_PATH} = CONSTANTS.PATHS.FE_ROOT_STATIC_FILE;
const pathStaticFile = process.env.NODE_ENV === CONSTANTS.ENVIRONMENT.DEV ? DEV_PATH : process.env.NODE_ENV === CONSTANTS.ENVIRONMENT.DETA_SH ? DETA_PATH : PROD_PATH;
app.use(express.static(path.join(__dirname, pathStaticFile)));

routing(app, express, dbClient);

if(process.env.NODE_ENV === DEV) {
	const Processor = new Process();

	app.listen(process.env.PORT, () =>
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
}

if(process.env.NODE_ENV === DETA_SH) {
	module.exports = app;
}
