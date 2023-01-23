import User from "../models/User.js";
import CONSTANTS from "../utils/constants.js";
import AppError from "../models/errors/AppError.js";
import authUtil from "../utils/authUtil.js";

const authController = {
	/**
	 *
	 * @param {DbClient} dbClient
	 */
	signUp: dbClient => async (req, res, next) => {
		try {
			let {email, password} = req.body;
			password = User.hashPassword(password);
			await dbClient.createUser({email, password})
			return res.status(200).send('ok');
		} catch (e) {
			next(e);
		}
	},
	/**
	 *
	 * @param {DbClient} dbClient
	 */
	signIn: dbClient => async (req, res, next) => {
		try {
			let { email, password } = req.body;
			let user = await dbClient.findUser({ email });
			const {code, text} = CONSTANTS.HTTP_CODE.CLIENT_ERRORS.UNAUTHORIZED;
			if (!user) {
				return next(new AppError({ code, message: "Utente non trovato." }));
			}
			let isPasswordValid = await User.comparePassword(password, user.password);
			if (!isPasswordValid) {
				return next(new AppError({ code, message: "La password non è corretta." }));
			}
			let token = authUtil.createToken({
				payload: {id: user._id.toString()},
				type: "access_token"
			});
			let refreshToken = authUtil.createToken({
				payload: {id: user._id.toString()},
				type: 'refresh_token'
			});
			res.cookie('access_token', token, authUtil.accessTokenCookieOptions);
			res.cookie('refresh_token', refreshToken, authUtil.refreshTokenCookieOptions);
			return res.status(CONSTANTS.HTTP_CODE.SUCCESS.OK.code).send("OK");
		} catch (error) {
			next(error);
		}
	},
	/**
	 *
	 * @param {DbClient} dbClient
	 */
	refresh: dbClient => async (req, res, next) => {
		try {
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
				payload: {id: user._id.toString()},
				type: "access_token"
			})
			const newRefreshToken = authUtil.createToken({
				payload: {id: user._id.toString()},
				type: "refresh_token"
			});
			res.cookie('access_token', accessToken, authUtil.accessTokenCookieOptions);
			res.cookie('refresh_token', newRefreshToken, authUtil.refreshTokenCookieOptions);
			return res.status(CONSTANTS.HTTP_CODE.SUCCESS.OK.code).send("OK");
		} catch (e) {
			next(e);
		}
	},
	logout: (req, res, next) => {
		try {
			res.cookie('access_token', '', {maxAge: 1});
			res.cookie('refresh_token', '', { maxAge: 1 });
			return res.status(CONSTANTS.HTTP_CODE.SUCCESS.OK.code).send("OK");
		} catch (e) {
			next(e);
		}
	}
}

export default authController;
