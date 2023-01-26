import express from "express";
import path from 'path';
import morgan from 'morgan';
import * as url from 'url';
import cookieParser from 'cookie-parser';
import DbClient from "./services/database/DbClient.js";
import MongoDbClient from "./services/database/MongoDbClient.js";
import Process from "./common/Process.js";
import { UTILS } from "./utils/utils.js";
import URLRecord from "./models/URLRecord.js";
import QRCode from 'qrcode';
import auth from "./utils/authUtil.js";
import User from "./models/User.js";
import routing from "./routes/routes.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

const dbClient = new DbClient(new MongoDbClient());
const Processor = new Process();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './../fe/dist')));

routing(app, express, dbClient);

// app.post('/signin', async (req, res, next) => {
// 	try {
// 		let { email, password } = req.body;
// 		let user = await dbClient.findUser({ email, password });
// 		if (!user) {
// 			return res.status(404).send({ message: "Utente non trovato" });
// 		}
// 		let isPasswordInvalid = !auth.comparePassword(password, user.password);
// 		if (isPasswordInvalid) {
// 			return res.status(403).send({ message: "La password non è valida" });
// 		}
// 		let token = auth.createToken(user._id);
// 		res.setHeader("Authorization", token);
// 		return res.status(200).send({
// 			...new User(user),
// 			accessToken: token
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// });
//
// app.post('/shortURL', async (req, res, next) => {
// 	try {
// 		let { url, qrCode } = req.body;
// 		console.log(req.protocol, req.get('host'), req.url, req.originalUrl);
// 		url.indexOf('https://') === -1 && url.indexOf('http://') === -1 && (url = 'https://' + url);
// 		if (!UTILS.isValidUrl(url)) {
// 			res.status(500).send({ error: "URL non valido" });
// 			return;
// 		}
// 		const urlRecord = new URLRecord(url);
// 		if (await dbClient.hasUrl(urlRecord)) {
// 			if (qrCode && urlRecord.qrCode === '') {
// 				urlRecord.qrCode = await QRCode.toDataURL(urlRecord.shortUrl);
// 				await dbClient.updateUrl(urlRecord);
// 			}
// 			res.status(200).send({
// 				...urlRecord,
// 				...(!qrCode && {qrCode: ''})
// 			});
// 			return;
// 		} else {
// 			let code = UTILS.randomID();
// 			let exist = await dbClient.hasCode(code);
// 			let urlByCode = new URLRecord();
// 			urlByCode.urlCode = code;
// 			while (exist) {
// 				code = UTILS.randomID();
// 				exist = await dbClient.hasCode(code);
// 			}
// 			urlRecord.urlCode = code;
// 			urlRecord.shortUrl = req.protocol + '://' + req.get('host') + '/' + code;
// 			qrCode && (urlRecord.qrCode = await QRCode.toDataURL(urlRecord.shortUrl));
// 			await dbClient.createUrl(urlRecord);
// 			res.status(200).send(urlRecord);
// 		}
// 	} catch (error) {
// 		next(error);
// 	}
// })
//
// app.get('/:code', async (req, res, next) => {
// 	let urlRecord = new URLRecord();
// 	urlRecord.urlCode = req.params.code;
// 	if (await dbClient.hasUrl(urlRecord)) {
// 		urlRecord.clicked++;
// 		await dbClient.updateUrl(urlRecord);
// 		console.log("Redirect to", urlRecord.originalUrl);
// 		res.redirect(301,urlRecord.originalUrl);
// 		return;
// 	}
// 	next();
// })
//
// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, '/../fe/dist', 'index.html'));
// })

app.listen(process.env.PORT, () =>
	dbClient.connect()
		.then(()=>
			Processor.schedule(()=>
				dbClient.disconnect()
			))
		.catch(console.dir)
		.finally(()=>
			console.log(`RUNNING on ${process.env.PORT}...`)
		)
);
