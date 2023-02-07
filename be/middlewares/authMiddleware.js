import AppError from "../models/errors/AppError.js";
import CONSTANTS from "../utils/constants.js";
import authUtil from "../utils/authUtil.js";
import LogUtil from "../utils/logUtil.js";

/**
 *
 * @param {DbClient} dbClient
 * @param {(function(req:Http.Request, res:Http.Response, next:Express.Next): Promise<boolean> | boolean) | boolean} execute
 */
export default function authMiddleware(dbClient, execute=null) {
    return async (req, res, next) => {
        LogUtil.log("AuthMiddleware START");
        try {
            if(execute) {
                if(typeof execute === "function") {
                    if(!await execute(req, res, next)) {
                        return next();
                    }
                } else {
                    if(!execute) {
                        return next();
                    }
                }
            }
            let {code, text} = CONSTANTS.HTTP_CODE.CLIENT_ERRORS.UNAUTHORIZED,
                unauthorizedError = new AppError({code, message: text}),
                useRefresh = false,
                access_token = req.headers.authorization,
                refresh_token = req.cookies.refresh_token,
                id,
                result,
                user;
            //Check if authorization bearer is present
            if(access_token && access_token.startsWith('Bearer')) {
                access_token = access_token.split(' ')[1];
                result = authUtil.verifyToken({token: access_token, type: "access_token"});
                result.isValid && ({id}=result.payload);
                //if user_id.id exist but refresh_token not, token is invalid
                if((id && !refresh_token) || (!!!id && !refresh_token)) {
                    return next(unauthorizedError);
                } else if(!!!id) {
                    //if user_id or user_id.id are undefined, check refreshToken validity
                    result = authUtil.verifyToken({token: refresh_token, type: "refresh_token"});
                    result.isValid && ({id}=result.payload);
                    if(!!!id) {
                        return next(unauthorizedError);
                    } else {
                        useRefresh = true;
                    }
                }
                user = await dbClient.findUser({id});
                //if user is undefined has been removed
                if(!user) {
                    return next(new AppError({code, message: "User no longer exists."}));
                }
                //if it has been used refreshToken, refresh access_token and refresh_token
                if(useRefresh) {
                    LogUtil.log("AuthMiddleware: refreshToken");
                    access_token = authUtil.createToken({
                        payload: {id: user.id},
                        type: "access_token"
                    })
                    const newRefreshToken = authUtil.createToken({
                        payload: {id: user.id},
                        type: "refresh_token"
                    });
                    res.cookie('refresh_token', newRefreshToken, authUtil.refreshTokenCookieOptions);
                }
                res.setHeader('Authorization', access_token);
                res.locals.user = user;
                return next();
            } else {
                return next(unauthorizedError);
            }
        } catch (e) {
            LogUtil.log("AuthMiddleware ERROR: ",e.message)
            next(e);
        } finally {
            LogUtil.log("AuthMiddleware FINISH");
        }
}};
