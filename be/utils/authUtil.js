import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CONSTANTS from "./constants.js";
import {Buffer} from "buffer";

const API_JWT_SECRET = "This is my secret";
const API_JWT_REFRESH_TOKEN = "This is my refresh secred";

const authUtil = {
    /**
     * @param {Object} obj
     * @param {any} obj.payload
     * @param {"access_token" | "refresh_token"} obj.type
     * @param {string} [obj.expire]
     * @returns {*}
     */
    createToken: ({payload, type, expire=null}) => jwt.sign(
        payload,
        Buffer.from(
            process.env[type==='access_token'? "ACCESS_TOKEN_KEY_PRIVATE" : "REFRESH_TOKEN_KEY_PRIVATE"],
            'base64'
        ).toString('ascii'),
        {
            expiresIn: expire ?? type === "access_token" ? CONSTANTS.EXPIRES_TOKEN_IN.ACCESS_TOKEN : CONSTANTS.EXPIRES_TOKEN_IN.REFRESH_TOKEN
        }
    ),
    verifyToken: (req, res, next) => {
        try {
            if (req.headers && req.headers.authorization && req.headers.authorization) {
                let id = jwt.verify(req.headers.authorization, API_SECRET)
            }
        } catch (error) {
            console.error(error);
            req.user = undefined
        }
    }
}

export default authUtil;