import feController from "../controllers/feController.js";
import routeNotFoundController from "../controllers/routeNotFoundController.js";
import errorController from "../controllers/errorController.js";
import apiRoutes from "./api/apiRoutes.js";
import shurlController from "../controllers/shurlController.js";
import CONSTANTS from "../utils/constants.js";
import configSwagger from "../swagger/index.js";

/**
 *
 * @param {core.Express} app
 * @param {Express} express
 * @param {DbClient} dbClient
 */
export default function routing(app, express, dbClient) {
	configSwagger(app);
	app.get(CONSTANTS.PATHS.SHURL_LINK, shurlController.url(dbClient));
	app.get(CONSTANTS.PATHS.WILDCARD, feController);
	app.use(CONSTANTS.PATHS.API, apiRoutes(express, dbClient));
	app.use(routeNotFoundController);
	app.use(errorController);
}