import { MongoClient, ObjectID } from "mongodb";
import DBError from "../../models/errors/DBError.js";
import CONSTANTS from "../../utils/constants.js";

export default class MongoDbClient {
    // Connection URI
    uri = process.env.MONGO_DB_URI;
    DB = process.env.DB;
    URLS = process.env.TABLE_URL;
    USER = process.env.TABLE_USER;

    constructor() {
        // Create a new MongoClient
        this.client = new MongoClient(this.uri);
    }

    async connect() {
        console.log("MongoClient connect start");
        try {
            await this.client.connect();
        } catch (error) {
            throw error;
        } finally {
            console.log("MongoClient connect finish");
        }
    }

    async disconnect() {
        console.log("MongoClient disconnect start");
        try {
            await this.client.close();
        } catch (error) {
            throw error;
        } finally {
            console.log("MongoClient disconnect finish");
        }
    }

    async hasUrl(url) {
        console.log("MongoClient hasUrl start");
        try {
            const URLS = this.client.db(this.DB).collection(this.URLS);
            const existedUrl = await URLS.findOne({
                ...(url.originalUrl !== '' ? {originalUrl: url.originalUrl} : {}),
                ...(url.shortUrl !== '' ? {shortUrl: url.shortUrl} : {}),
                ...(url.urlCode !== '' ? {urlCode: url.urlCode} : {})
            })

            if (existedUrl) {
                url.clicked = existedUrl.clicked;
                url.originalUrl = existedUrl.originalUrl;
                url.shortUrl = existedUrl.shortUrl;
                url.urlCode = existedUrl.urlCode;
                url.updateAt = existedUrl.updateAt;
                url.created = existedUrl.created;
                url.qrCode = existedUrl.qrCode;
                return true;
            }

            return false;
        } catch (error) {
            throw error;
        } finally {
            console.log("MongoClient hasUrl finish");
        }
    }

    async updateUrl(url) {
        console.log("MongoClient updateUrl start");
        try {
            const URLS = this.client.db(this.DB).collection(this.URLS);
            await URLS.updateOne({
                urlCode: url.urlCode,
            }, {
                $set: {
                    clicked: url.clicked,
                    ...(url.qrCode !== '' && {qrCode: url.qrCode}),
                    updateAt: new Date().getTime()
                }
            })
        } catch (error) {
            throw error;
        } finally {
            console.log("MongoClient updateUrl finish");
        }
    }

    async hasCode(code) {
        console.log("MongoClient hasCode start");
        try {
            const URLS = this.client.db(this.DB).collection(this.URLS);
            const existedUrl = await URLS.findOne({
                urlCode: code
            })
            return existedUrl ? true : false;
        } catch (error) {
            throw error;
        } finally {
            console.log("MongoClient hasCode finish");
        }
    }

    async createUrl(url) {
        console.log("MongoClient createUrl start");
        try {
            const URLS = this.client.db(this.DB).collection(this.URLS);
            url.created = new Date().getTime();
            const result = await URLS.insertOne(url)
            console.log("MongoClient createUrl result:", result);
            return true;
        } catch (error) {
            throw error;
        } finally {
            console.log("MongoClient createUrl finish");
        }
    }

    async createUser({email, password}) {
        console.log("MongoClient createUser start");
        try {
            const USER = this.client.db(this.DB).collection(this.USER);
            const result = await USER.insertOne({
                email,
                password,
                created: new Date().getTime(),
                active: true
            })
            console.log("MongoClient createUser result:", result);
            return true;
        } catch (error) {
            if (error.code && error.code === CONSTANTS.MONGO_ERROR[11000]) {
                let fields = Object.keys(error.keyValue);
                throw new DBError({code: 409, message: `${fields.length>1 ? fields.join(', ') : fields[0]} già present${fields.length>1 ? 'i' : 'e'}.`});
            }
            throw error;
        } finally {
            console.log("MongoClient createUser finish");
        }
    }

    async findUser({id=null, email=null, password=null}) {
        console.log("MongoClient findUser start");
        try {
            const USER = this.client.db(this.DB).collection(this.USER);
            const result = await USER.findOne({
                ...(id ? {_id: ObjectID(id)}: {}),
                ...(email ? { email} : {}),
                ...(password ? {password} : {}),
                active: true
            })
            console.log("MongoClient findUser result:", result);
            if (result) {
                return result;
            }
            return false;
        } catch (error) {
            if (error.code && error.code === CONSTANTS.MONGO_ERROR[11000]) {
                let fields = Object.keys(error.keyValue);
                throw new DBError({code: 409, message: `${fields.length>1 ? fields.join(', ') : fields[0]} già present${fields.length>1 ? 'i' : 'e'}.`});
            }
            throw error;
        } finally {
            console.log("MongoClient findUser finish");
        }
    }
}
