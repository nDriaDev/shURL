import authMiddleware from "../../../middlewares/authMiddleware.js";
import shurlController from "../../../controllers/shurlController.js";
import validatorMiddleware from "../../../middlewares/validatorMiddleware.js";
import ShurlGenValidator from "../../../validators/shurlGenValidator.js";
import sanitizerMiddleware from "../../../middlewares/sanitizerMiddleware.js";

/**
 *
 * @param primaryRouter
 * @param {core.Router} router
 * @param {DbClient} dbClient
 */
export default function shurlRoutes(primaryRouter, router, dbClient) {
	primaryRouter.use('/shurl', router);
	router
		.post(
			'/generate',
			authMiddleware(dbClient),
			sanitizerMiddleware({fields: ["expireIn"], type: "body"}),
			validatorMiddleware(ShurlGenValidator),
			shurlController.generate(dbClient)
		)
}