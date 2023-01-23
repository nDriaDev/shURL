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
			let user = await dbClient.findUser({ email, password });
			const {code, text} = CONSTANTS.HTTP_CODE.CLIENT_ERRORS.UNAUTHORIZED;
			if (!user) {
				return res.status(code).send(new AppError({ code: text, message: "Utente non trovato" }));
			}
			let isPasswordInvalid = !User.comparePassword(password, user.password);
			if (isPasswordInvalid) {
				return res.status(code).send(new AppError({ code: text, message: "La password non è valida" }));
			}
			let token = authUtil.createToken({
				payload: user._id,
				type: "access_token"
			});
			let refreshToken = authUtil.createToken({
				payload: user._id,
				type: 'refresh_token'
			})
			res.setHeader("Authorization", token);
			return res.status(CONSTANTS.HTTP_CODE.SUCCESS.OK.code).send({
				accessToken: token
			});
		} catch (error) {
			next(error);
		}
	}
}

export default authController;