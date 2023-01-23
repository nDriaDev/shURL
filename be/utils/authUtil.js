import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CONSTANTS from "./constants.js";
import {Buffer} from "buffer";

const API_JWT_SECRET = "This is my secret";
const API_JWT_REFRESH_TOKEN = "This is my refresh secred";

const authUtil = {
    accessTokenCookieOptions: {
        expires: new Date(Date.now()+CONSTANTS.EXPIRES_TOKEN_IN.ACCESS_TOKEN),
        maxAge: CONSTANTS.EXPIRES_TOKEN_IN.ACCESS_TOKEN,
        httpOnly: false,
    },
    refreshTokenCookieOptions: {
        expires: new Date(Date.now()+CONSTANTS.EXPIRES_TOKEN_IN.REFRESH_TOKEN),
        maxAge: CONSTANTS.EXPIRES_TOKEN_IN.REFRESH_TOKEN,
        httpOnly: true,
        sameSite: 'lax',
        ...(process.env.NODE_ENV === "production" ? {secure: true} : {})
    },
    /**
     * @param {Object} obj
     * @param {any} obj.payload
     * @param {"access_token" | "refresh_token"} obj.type
     * @param {string} [obj.expire]
     * @returns {*}
     */
    createToken: ({payload, type, expire=null}) => {
        console.log(expire ?? type === "access_token" ? CONSTANTS.EXPIRES_TOKEN_IN.ACCESS_TOKEN : CONSTANTS.EXPIRES_TOKEN_IN.REFRESH_TOKEN);
        return jwt.sign(
            payload,
            Buffer.from(
                process.env[type === 'access_token' ? "ACCESS_TOKEN_KEY_PRIVATE" : "REFRESH_TOKEN_KEY_PRIVATE"],
                'base64'
            ).toString('ascii'),
            {
                expiresIn: expire ?? type === "access_token" ? CONSTANTS.EXPIRES_TOKEN_IN.ACCESS_TOKEN : CONSTANTS.EXPIRES_TOKEN_IN.REFRESH_TOKEN,
                algorithm: 'RS256'
            }
        )
    },
    /**
     * @param {Object} obj
     * @param {string} obj.token
     * @param {"access_token" | "refresh_token"} obj.type
     */
    verifyToken: ({token, type}) => {
        try {
            const key = Buffer.from(
                process.env[type==='access_token' ? "ACCESS_TOKEN_KEY_PUBLIC": "REFRESH_TOKEN_KEY_PUBLIC"],
                'base64'
            ).toString('ascii');
            return jwt.verify(token, key);
        } catch (error) {
            throw error;
        }
    }
}

export default authUtil;
