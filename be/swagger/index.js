import CONSTANTS from "../utils/constants.js";
import swaggerUi from 'swagger-ui-express';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerJSON = require('./swagger.json');
export default function configSwagger(app) {
	process.env.NODE_ENV === CONSTANTS.ENVIRONMENT.DEV && app.use(
		CONSTANTS.PATHS.SWAGGER,
		swaggerUi.serve,
		swaggerUi.setup(
			swaggerJSON,
			{
				explorer: true
			}
		)
	)
}