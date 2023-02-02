import cspController from "../../../controllers/cspController.js";

export default function cspRoutes(express, dbClient) {
	let router = express.Router();

	router
		.post(
			'/report',
			cspController.report(dbClient)
		);

	return router;
}