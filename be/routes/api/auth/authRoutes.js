import validatorMiddleware from "../../../middlewares/validatorMiddleware.js";
import AuthValidator from "../../../validators/authValidator.js";
import authController from "../../../controllers/authController.js";
import authMiddleware from "../../../middlewares/authMiddleware.js";
import ActivateUserValidator from "../../../validators/activateUserValidator.js";
import MailClient from "../../../services/email/mailClient.js";
import ForgotPasswordValidator from "../../../validators/forgotPasswordValidator.js";
import ResetPasswordValidator from "../../../validators/ResetPasswordValidator.js";

/**
 *
 * @param primaryRouter
 * @param {core.Router} router
 * @param {DbClient} dbClient
 */
export default function authRoutes(primaryRouter, router, dbClient) {
	let mailClient = new MailClient();

	primaryRouter.use('/auth', router);
	router
		.post(
			'/signup',
			validatorMiddleware(AuthValidator),
			authController.signUp(dbClient, mailClient)
		)
		.post(
			'/signin',
			validatorMiddleware(AuthValidator),
			authController.signIn(dbClient)
		)
		.post(
			'/forgotPassword',
			validatorMiddleware(ForgotPasswordValidator),
			authController.forgotPassword(dbClient, mailClient)
		)
		.post(
			'/resetPassword',
			validatorMiddleware(ResetPasswordValidator),
			authController.resetPassword(dbClient)
		)
		.get('/activate',
			validatorMiddleware(ActivateUserValidator),
			authController.activateUser(dbClient)
		)
		.get(
			'/me',
			authMiddleware(dbClient),
			authController.me
		)
		.get(
			'/refresh',
			authController.refresh(dbClient)
		)
		.get(
			'/logout',
			authController.logout
		);
}
