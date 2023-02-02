import {MongoClient, ObjectId} from "mongodb";
import DBError from "../../models/errors/DBError.js";
import CONSTANTS from "../../utils/constants.js";
import LogUtil from "../../utils/logUtil.js";
import User from "../../models/User.js";
import URLRecord from "../../models/URLRecord.js";
import URLTempRecord from "../../models/URLTempRecord.js";

export default class MongoDbClient {
    client;
    uri = process.env.MONGO_DB_URI;
    DB = process.env.DB;
    URLS = process.env.TABLE_URL;
    URLS_TEMP = process.env.TABLE_URL_TEMPORARY;
    USER = process.env.TABLE_USER;

    constructor() {
        // Create a new MongoClient
        this.client = new MongoClient(this.uri);
    }
await
    async handlingTTLIndex(table) {
        try {
            let indxs = await table.indexes();
            if(indxs.filter(el => el.hasOwnProperty('expireAfterSeconds')).length === 0) {
                table.createIndex( { "expireAt": 1 }, { expireAfterSeconds: 0 } );
            }
        } catch (e) {
            if(e.code === CONSTANTS.MONGO_ERROR["26"].code) {
                table.createIndex( { "expireAt": 1 }, { expireAfterSeconds: 0 } );
            } else {
                throw e;
            }
        }
    }

    async connect() {
        LogUtil.log("MongoClient connect START");
        try {
            await this.client.connect();
        } catch (error) {
            throw error;
        } finally {
            LogUtil.log("MongoClient connect FINISH");
        }
    }

    async disconnect() {
        LogUtil.log("MongoClient disconnect START");
        try {
            await this.client.close();
        } catch (error) {
            throw error;
        } finally {
            LogUtil.log("MongoClient disconnect FINISH");
        }
    }

    async hasCode(code) {
        LogUtil.log("MongoClient hasCode START");
        try {
            const URLS = this.client.db(this.DB).collection(this.URLS);
            let existedUrl = await URLS.findOne({
                urlCode: code
            })
            if(!!!existedUrl) {
                const URLS_TEMP = this.client.db(this.DB).collection(this.URLS_TEMP);
                existedUrl = await URLS_TEMP.findOne({
                    urlCode: code
                })

                return !!existedUrl;
            }
            return true;
        } catch (error) {
            throw error;
        } finally {
            LogUtil.log("MongoClient hasCode FINISH");
        }
    }

    async createUrl(url) {
        LogUtil.log("MongoClient createUrl START");
        try {
            const URLS = this.client.db(this.DB).collection(this.URLS);
            url.createdAt = new Date().getTime();
            const result = await URLS.insertOne(url)
            return true;
        } catch (error) {
            throw error;
        } finally {
            LogUtil.log("MongoClient createUrl FINISH");
        }
    }

    async findUrl(url) {
        LogUtil.log("MongoClient findUrl START");
        try {
            const URLS = this.client.db(this.DB).collection(this.URLS);
            let urlDB = await URLS.findOne({
                ...(url.originalUrl !== '' ? {originalUrl: url.originalUrl} : {}),
                ...(url.shortUrl !== '' ? {shortUrl: url.shortUrl} : {}),
                ...(url.urlCode !== '' ? {urlCode: url.urlCode} : {})
            });
            return urlDB ? URLRecord.mappingURLDBToURLRecord(urlDB) : null;
        } catch (error) {
            throw error;
        } finally {
            LogUtil.log("MongoClient findUrl FINISH");
        }
    }

    async updateUrl(url) {
        LogUtil.log("MongoClient updateUrl START");
        try {
            const URLS = this.client.db(this.DB).collection(this.URLS);
            const { matchedCount, modifiedCount } = await URLS.updateOne({
                urlCode: url.urlCode,
            }, {
                $set: {
                    clicked: url.clicked,
                    ...(url.qrCode !== '' && {qrCode: url.qrCode}),
                    users: url.users,
                    updateAt: new Date().getTime()
                }
            })
            if(matchedCount === 0) {
                throw(DBError({code: CONSTANTS.HTTP_CODE.CLIENT_ERRORS.NOT_FOUND.code, message: "Record not found"}));
            }
            if(matchedCount>0 && modifiedCount===0) {
                throw(DBError({code: CONSTANTS.HTTP_CODE.CLIENT_ERRORS.BAD_REQUEST.code, message: "Record not updated"}));
            }
        } catch (error) {
            throw error;
        } finally {
            LogUtil.log("MongoClient updateUrl FINISH");
        }
    }

    async createTempUrl(url, expireIn) {
        LogUtil.log("MongoClient createTempUrl START");
        try {
            let URLS_TEMP = this.client.db(this.DB).collection(this.URLS_TEMP);
            await this.handlingTTLIndex(URLS_TEMP);
            url.createdAt = new Date().getTime();
            if(Number.isInteger(expireIn)) {
                let dt = new Date();
                dt.setHours(dt.getHours()+expireIn);
                url.expireAt = dt;
            } else {
                let hours=0, minutes=Number(expireIn)*60;
                let dt = new Date();
                dt.setHours(dt.getHours()+hours, dt.getMinutes()+minutes);
                url.expireAt = dt;
            }
            let urlDB = URLTempRecord.mappingURLTempRecordToURLTempDB(url);
            const result = await URLS_TEMP.insertOne(urlDB);
            return true;
        } catch (e) {
            throw e;
        } finally {
            LogUtil.log("MongoClient createTempUrl FINISH");
        }
    }

    async findTempUrl(url) {
        LogUtil.log("MongoClient findTempUrl START");
        try {
            const URLS_TEMP = this.client.db(this.DB).collection(this.URLS_TEMP);
            let urlDB = await URLS_TEMP.findOne({
                ...(url.originalUrl !== '' ? {originalUrl: url.originalUrl} : {}),
                ...(url.shortUrl !== '' ? {shortUrl: url.shortUrl} : {}),
                ...(url.urlCode !== '' ? {urlCode: url.urlCode} : {})
            });
            return urlDB ? URLTempRecord.mappingURLTempDBToURLTempRecord(urlDB) : null;
        } catch (error) {
            throw error;
        } finally {
            LogUtil.log("MongoClient findTempUrl FINISH");
        }
    }

    async createUser({email, password}) {
        LogUtil.log("MongoClient createUser START");
        try {
            const USER = this.client.db(this.DB).collection(this.USER);
            const result = await USER.insertOne({
                email,
                password,
                createdAt: new Date().getTime(),
                active: true
            })
            return true;
        } catch (error) {
            if (error.code && error.code === CONSTANTS.MONGO_ERROR[11000]) {
                let fields = Object.keys(error.keyValue);
                throw new DBError({code: 409, message: `${fields.length>1 ? fields.join(', ') : fields[0]} già present${fields.length>1 ? 'i' : 'e'}.`});
            }
            throw error;
        } finally {
            LogUtil.log("MongoClient createUser FINISH");
        }
    }

    async findUser({id=null, email=null, password=null}) {
        LogUtil.log("MongoClient findUser START");
        try {
            const USER = this.client.db(this.DB).collection(this.USER);
            const result = await USER.findOne({
                ...(id ? {_id: ObjectId(id)}: {}),
                ...(email ? { email} : {}),
                ...(password ? {password} : {}),
                active: true
            })
            if (result) {
                return User.mappingUserDBToUser(result);
            }
            return false;
        } catch (error) {
            if (error.code && error.code === CONSTANTS.MONGO_ERROR[11000]) {
                let fields = Object.keys(error.keyValue);
                throw new DBError({code: 409, message: `${fields.length>1 ? fields.join(', ') : fields[0]} già present${fields.length>1 ? 'i' : 'e'}.`});
            }
            throw error;
        } finally {
            LogUtil.log("MongoClient findUser FINISH");
        }
    }
}
