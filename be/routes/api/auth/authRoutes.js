import validatorMiddleware from "../../../middlewares/validatorMiddleware.js";
import AuthValidator from "../../../validators/authValidator.js";
import authController from "../../../controllers/authController.js";
import authMiddleware from "../../../middlewares/authMiddleware.js";

/**
 *
 * @param primaryRouter
 * @param {core.Router} router
 * @param {DbClient} dbClient
 */
export default function authRoutes(primaryRouter, router, dbClient) {
	primaryRouter.use('/auth', router);
	router
		.post(
			'/signup',
			validatorMiddleware(AuthValidator),
			authController.signUp(dbClient)
		)
		.post(
			'/signin',
			validatorMiddleware(AuthValidator),
			authController.signIn(dbClient)
		)
		.get(
			'/prova',
			authMiddleware(dbClient),
			(req, res) => res.status(200).send(res.locals.user)
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
