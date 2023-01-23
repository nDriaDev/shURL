import feController from "../controllers/feController.js";
import routeNotFoundController from "../controllers/routeNotFoundController.js";
import errorController from "../controllers/errorController.js";
import apiRoutes from "./api/apiRoutes.js";

/**
 *
 * @param {core.Express} app
 * @param {Express} express
 * @param {DbClient} dbClient
 */
export default function routing(app, express, dbClient) {
	app.get('*', feController);
	app.use('/api', apiRoutes(express, dbClient));
	app.use(routeNotFoundController);
	app.use(errorController);
}