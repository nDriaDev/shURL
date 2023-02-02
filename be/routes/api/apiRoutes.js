import authRoutes from "./auth/authRoutes.js";
import shurlRoutes from "./shurl/shurlRoutes.js";
import statusRoutes from "./status/statusRoutes.js";

/**
 *
 * @param express
 * @param {DbClient} dbClient
 * @returns {*|Router|core.Router}
 */
export default function apiRoutes(express, dbClient) {
	let primaryRouter = express.Router();
	statusRoutes(primaryRouter, express.Router());
	authRoutes(primaryRouter, express.Router(), dbClient);
	shurlRoutes(primaryRouter, express.Router(), dbClient);
	return primaryRouter;
}