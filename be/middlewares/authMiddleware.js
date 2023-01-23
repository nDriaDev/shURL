import auth from "../utils/authUtil.js";
import AppError from "../models/errors/AppError.js";
import CONSTANTS from "../utils/constants.js";
import authUtil from "../utils/authUtil.js";

export default function authMiddleware(dbClient) {
    return async (req, res, next) => {
        console.log("AuthMiddleware INIT");
        try {
            const {code, text} = CONSTANTS.HTTP_CODE.CLIENT_ERRORS.UNAUTHORIZED;
            let unauthorizedError = new AppError({code, message: text});
            let user_id, useRefresh = false;
            console.log("AuthMiddleware AccessToken verifying...");
            //TODO jwt verify not work for expired token (if send accessToken with cookie, when expired it not sent to BE)
            if(req.cookies.access_token) {
                let {access_token} = req.cookies;
                user_id = authUtil.verifyToken({token: access_token, type: "access_token"});
                if(!!!user_id || !!!user_id.id) {
                    console.log("AuthMiddleware RefreshToken verifying...");
                    let refresh_token = req.cookies.refresh_token;
                    user_id = authUtil.verifyToken({token: refresh_token, type: "refresh_token"});
                    if(!!!user_id || !!!user_id.id) {
                        return next(unauthorizedError);
                    } else {
                        useRefresh = true;
                    }
                }
                const user = await dbClient.findUser({id: user_id.id});
                if(!user) {
                    return next(new AppError({code, message: "User no longer exists"}));
                }
                if(useRefresh) {
                    const accessToken = authUtil.createToken({
                        payload: {id: user._id.toString()},
                        type: "access_token"
                    })
                    const newRefreshToken = authUtil.createToken({
                        payload: {id: user._id.toString()},
                        type: "refresh_token"
                    });
                    res.cookie('refresh_token', newRefreshToken, authUtil.refreshTokenCookieOptions);
                    res.cookie('access_token', accessToken, authUtil.accessTokenCookieOptions);
                }
                res.locals.user = user;
                return next();
            } else {
                return next(unauthorizedError);
            }
        } catch (e) {
            next(e);
        } finally {
            console.log("AuthMiddleware FINISH");
        }
}};
