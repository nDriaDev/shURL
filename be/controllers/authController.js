import User from "../models/User.js";
import CONSTANTS from "../utils/constants.js";
import AppError from "../models/errors/AppError.js";
import authUtil from "../utils/authUtil.js";
import LogUtil from "../utils/logUtil.js";

const authController = {
	/**
	 *
	 * @param {DbClient} dbClient
	 */
	signUp: dbClient => async (req, res, next) => {
		try {
			LogUtil.log("authController signUp: FINISH");
			let {email, password} = req.body;
			password = User.hashPassword(password);
			await dbClient.createUser({email, password})
			return res.status(200).send('ok');
		} catch (e) {
			next(e);
		} finally {
			LogUtil.log("authController signUp: FINISH");
		}
	},
	/**
	 *
	 * @param {DbClient} dbClient
	 */
	signIn: dbClient => async (req, res, next) => {
		try {
			LogUtil.log("authController signIn: START");
			let { email, password } = req.body;
			let user = await dbClient.findUser({ email });
			const {code, text} = CONSTANTS.HTTP_CODE.CLIENT_ERRORS.NOT_FOUND;
			if (!user) {
				return next(new AppError({ code, message: "Utente non trovato." }));
			}
			let isPasswordValid = await User.comparePassword(password, user.password);
			if (!isPasswordValid) {
				return next(new AppError({ code, message: "La password non è corretta." }));
			}
			let token = authUtil.createToken({
				payload: {id: user.id},
				type: "access_token"
			});
			let refreshToken = authUtil.createToken({
				payload: {id: user.id},
				type: 'refresh_token'
			});
			res.header('Authorization', token);
			res.cookie('refresh_token', refreshToken, authUtil.refreshTokenCookieOptions);
			return res.status(CONSTANTS.HTTP_CODE.SUCCESS.OK.code).send("OK");
		} catch (error) {
			next(error);
		} finally {
			LogUtil.log("authController signIn: FINISH");
		}
	},
	/**
	 *
	 * @param {DbClient} dbClient
	 */
	refresh: dbClient => async (req, res, next) => {
		try {
			LogUtil.log("authController refresh: START");
			const refreshToken = req.cookies.refresh_token;
			const noRefreshError = new AppError({
				code: CONSTANTS.HTTP_CODE.CLIENT_ERRORS.FORBIDDEN.code,
				message: "Impossible to refresh access token"
			});
			const user_id = authUtil.verifyToken({token: refreshToken, type: "refresh_token"});
			if(!!!user_id || !!!user_id.id) {
				return next(noRefreshError);
			}
			const user = await dbClient.findUser({id: user_id.id});
			if(!user) {
				return next(noRefreshError);
			}
			const accessToken = authUtil.createToken({
				payload: {id: user.id},
				type: "access_token"
			})
			const newRefreshToken = authUtil.createToken({
				payload: {id: user.id},
				type: "refresh_token"
			});
			res.header('Authorization', accessToken);
			res.cookie('refresh_token', newRefreshToken, authUtil.refreshTokenCookieOptions);
			return res.status(CONSTANTS.HTTP_CODE.SUCCESS.OK.code).send("OK");
		} catch (e) {
			next(e);
		} finally {
			LogUtil.log("authController refresh: FINISH");
		}
	},
	me: (req, res, next) => {
		try {
			LogUtil.log("authController me: START");
			const user = res.locals.user;
			delete user.password;
			delete user.active;
			delete user.id;
			return res.status(CONSTANTS.HTTP_CODE.SUCCESS.OK.code).send(user);
		} catch (e) {
			next(e);
		} finally {
			LogUtil.log("authController me: FINISH");
		}
	},
	logout: (req, res, next) => {
		try {
			LogUtil.log("authController logout: START");
			res.cookie('refresh_token', '', { maxAge: 1 });
			return res.status(CONSTANTS.HTTP_CODE.SUCCESS.OK.code).send("OK");
		} catch (e) {
			next(e);
		} finally {
			LogUtil.log("authController logout: FINISH");
		}
	}
}

export default authController;
