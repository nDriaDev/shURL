import jwt from 'jsonwebtoken';
import CONSTANTS from "./constants.js";

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
        ...([CONSTANTS.ENVIRONMENT.PROD, CONSTANTS.ENVIRONMENT.DETA_SH].includes(process.env.NODE_ENV) ? {secure: true} : {})
    },
    /**
     * @param {Object} obj
     * @param {any} obj.payload
     * @param {"access_token" | "refresh_token" | "activation_token"} obj.type
     * @param {string} [obj.expire]
     * @returns {*}
     */
    createToken: ({payload, type, expire=null}) => {
        return jwt.sign(
            payload,
            ["access_token", "activation_token"].includes(type) ?
                process.env.ACCESS_TOKEN_SECRET:
                Buffer.from(process.env.REFRESH_TOKEN_KEY_PRIVATE, 'base64').toString('ascii'),
            {
                expiresIn: expire ?? type === "activation_token" ? CONSTANTS.EXPIRES_TOKEN_IN.ACTIVATE_TOKEN : type === "access_token" ? CONSTANTS.EXPIRES_TOKEN_IN.ACCESS_TOKEN : CONSTANTS.EXPIRES_TOKEN_IN.REFRESH_TOKEN,
                ...(["access_token", "activation_token"].includes(type) ? {} : {algorithm: 'RS256'})
            }
        )
    },
    /**
     * @param {Object} obj
     * @param {string} obj.token
     * @param {"access_token" | "refresh_token" | "activation_token"} obj.type     */
    verifyToken: ({token, type}) => {
        try {
            const key = ["access_token", "activation_token"].includes(type) ?
                process.env.ACCESS_TOKEN_SECRET:
                Buffer.from(process.env.REFRESH_TOKEN_KEY_PRIVATE, 'base64').toString('ascii');
            let payload = jwt.verify(token, key);
            return {
                isValid: true,
                payload
            }
        } catch (error) {
            if(error instanceof jwt.JsonWebTokenError) {
                return {
                    isValid: false,
                    payload: null
                }
            }
            throw error;
        }
    }
}

export default authUtil;
