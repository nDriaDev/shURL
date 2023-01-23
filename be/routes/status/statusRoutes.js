import statusController from "../../controllers/statusController.js";

export default function statusRoutes(primaryRouter, router) {
	primaryRouter.use('/status', router);
	router
		.get(
			'/',
			statusController
		);
}