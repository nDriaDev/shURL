import validatorMiddleware from "../../../middlewares/validatorMiddleware.js";
import AuthValidator from "../../../validators/authValidator.js";
import authController from "../../../controllers/authController.js";

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
			(req,res,next)=> res.status(200).send('/signin')
		)
		.get(
			'/refresh',
			(req,res,next)=> res.status(200).send('/refresh')
		)
		.get(
			'/logout',
			(req,res,next)=> res.status(200).send('/logout')
		);
}