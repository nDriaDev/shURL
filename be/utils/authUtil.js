import jwt from 'jsonwebtoken';
import CONSTANTS from "./constants.js";
import LogUtil from './logUtil.js';

const NODE_ENV = process.env.NODE_ENV;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_KEY_PRIVATE = process.env.REFRESH_TOKEN_KEY_PRIVATE;
const ALGORITHM = "ES256";

const authUtil = {
    accessTokenCookieOptions: {
        expires: new Date(Date.now()+CONSTANTS.EXPIRE_COOKIE_TOKEN_IN.ACCESS_TOKEN),
        maxAge: CONSTANTS.EXPIRE_COOKIE_TOKEN_IN.ACCESS_TOKEN,
        httpOnly: false,
    },
    refreshTokenCookieOptions: {
        expires: new Date(Date.now()+CONSTANTS.EXPIRE_COOKIE_TOKEN_IN.REFRESH_TOKEN),
        maxAge: CONSTANTS.EXPIRE_COOKIE_TOKEN_IN.REFRESH_TOKEN,
        httpOnly: true,
        sameSite: 'lax',
        ...(CONSTANTS.ENVIRONMENT.PROD === NODE_ENV && {secure: true})
    },
    /**
     * @param {Object} obj
     * @param {any} obj.payload
     * @param {"access_token" | "refresh_token" | "activation_token"} obj.type
     * @param {string} [obj.expire]
     * @returns {*}
     */
    createToken: ({payload, type, expire=null}) => {
        LogUtil.log("authUtil.createToken: START");
        const token = jwt.sign(
            payload,
            ["access_token", "activation_token"].includes(type) 
                ? ACCESS_TOKEN_SECRET
                : Buffer.from(REFRESH_TOKEN_KEY_PRIVATE, 'base64').toString('ascii'),
            {
                expiresIn: expire ?? type === "activation_token" ? CONSTANTS.EXPIRES_TOKEN_IN.ACTIVATE_TOKEN : type === "access_token" ? CONSTANTS.EXPIRES_TOKEN_IN.ACCESS_TOKEN : CONSTANTS.EXPIRES_TOKEN_IN.REFRESH_TOKEN,
                ...(["access_token", "activation_token"].includes(type) ? {} : {algorithm: ALGORITHM})
            }
        )
        LogUtil.log("authUtil.createToken: END");
        return token;
    },
    /**
     * @param {Object} obj
     * @param {string} obj.token
     * @param {"access_token" | "refresh_token" | "activation_token"} obj.type     */
    verifyToken: ({token, type}) => {
        LogUtil.log("authUtil.verifyToken: START");
        try {
            const key = ["access_token", "activation_token"].includes(type) ?
                ACCESS_TOKEN_SECRET:
                Buffer.from(REFRESH_TOKEN_KEY_PRIVATE, 'base64').toString('ascii');
            let payload = jwt.verify(token, key);
            return {
                isValid: true,
                payload
            }
        } catch (error) {
            LogUtil.log("authUtil.verifyToken: ERROR", error?.message || error);
            if(error instanceof jwt.JsonWebTokenError) {
                return {
                    isValid: false,
                    payload: null
                }
            }
            throw error;
        } finally {
            LogUtil.log("authUtil.verifyToken: END");
        }
    }
}

export default authUtil;
