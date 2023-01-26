import auth from "../utils/authUtil.js";
import AppError from "../models/errors/AppError.js";
import CONSTANTS from "../utils/constants.js";
import authUtil from "../utils/authUtil.js";

export default function authMiddleware(dbClient) {
    return async (req, res, next) => {
        console.log("AuthMiddleware START");
        try {
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
                    return next(new AppError({code, message: "User no longer exists"}));
                }
                //if it has been used refreshToken, refresh access_token and refresh_token
                if(useRefresh) {
                    console.log("AuthMiddleware: refreshToken");
                    access_token = authUtil.createToken({
                        payload: {id: user._id.toString()},
                        type: "access_token"
                    })
                    const newRefreshToken = authUtil.createToken({
                        payload: {id: user._id.toString()},
                        type: "refresh_token"
                    });
                    res.cookie('refresh_token', newRefreshToken, authUtil.refreshTokenCookieOptions);
                }
                res.header('Authorization', access_token);
                res.locals.user = user;
                return next();
            } else {
                return next(unauthorizedError);
            }
        } catch (e) {
            console.log("AuthMiddleware ERROR: ",e.message)
            next(e);
        } finally {
            console.log("AuthMiddleware FINISH");
        }
}};
