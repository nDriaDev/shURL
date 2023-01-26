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

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const dbClient = new DbClient(new MongoDbClient());
const Processor = new Process();

const app = express();

LogUtil.init(app);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, CONSTANTS.PATHS.FE_ROOT_STATIC_FILE)));

routing(app, express, dbClient);

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
