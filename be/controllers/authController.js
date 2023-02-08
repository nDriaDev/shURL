import User from "../models/User.js";
import CONSTANTS from "../utils/constants.js";
import AppError from "../models/errors/AppError.js";
import authUtil from "../utils/authUtil.js";
import LogUtil from "../utils/logUtil.js";
import activationUserTemplate from "../services/email/template/activationUserTemplate.js";
import {App} from "deta";
import urlUtil from "../utils/urlUtil.js";

const authController = {
	/**
	 *
	 * @param {DbClient} dbClient
	 * @param {MailClient} mailClient
	 */
	signUp: (dbClient, mailClient) => async (req, res, next) => {
		try {
			LogUtil.log("authController signUp: FINISH");
			let {email, password} = req.body;
			if(await dbClient.findUser({email})) {
				return next(new AppError({code: CONSTANTS.HTTP_CODE.CLIENT_ERRORS.CONFLICT.code, message: "Email already exist."}))
			}
			password = User.hashPassword(password);
			await dbClient.createTempUser({email, password});
			const token = await authUtil.createToken({
				payload: {
					email
				},
				type: "activation_token"
			})
			await mailClient.sendMail({
				to: email,
				subject: "ShURL - activation user",
				text: "Thanks for signing in!\nPlease click on follow link to activate your account:\nhttps://shurl.ndria.dev/activeUser?token="+token,
				html: activationUserTemplate({
					linkRef: urlUtil.activateUserUrl(req, token),
				})
			})
			return res.status(CONSTANTS.HTTP_CODE.SUCCESS.OK.code).send('ok');
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
			res.setHeader('Authorization', token);
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
			res.setHeader('Authorization', accessToken);
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
	},
	activateUser: dbClient => async (req, res, next) => {
		try {
			LogUtil.log("authController activeUser: START");
			const { activation_token: token } = req.query;
			const result = authUtil.verifyToken({token, type: "activation_token"});
			if(!result.isValid) {
				return next(new AppError({code: CONSTANTS.HTTP_CODE.CLIENT_ERRORS.FORBIDDEN.code, message: "token expired. Repeat sign up process."}));
			}
			const userEmail = result.payload.email;
			const user = await dbClient.findUser({email: userEmail, active: false});
			if(!user) {
				return next(new AppError({code: CONSTANTS.HTTP_CODE.CLIENT_ERRORS.NOT_FOUND, message: "User not found."}));
			}
			await dbClient.createUser(user);
			return res.status(CONSTANTS.HTTP_CODE.SUCCESS.OK.code).send("OK");
		} catch (e) {
			next(e);
		} finally {
			LogUtil.log("authController activeUser: FINISH");
		}
	}
}

export default authController;
