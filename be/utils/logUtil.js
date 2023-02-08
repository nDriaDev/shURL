import morgan from 'morgan';
import CONSTANTS from "./constants.js";

const LogUtil = {
	init: app => {
		if ([CONSTANTS.ENVIRONMENT.DEV, CONSTANTS.ENVIRONMENT.DETA_SH].includes(process.env.NODE_ENV)) {
			app.use(morgan('dev'));
		}
	},
	log: (...args) => {
		[CONSTANTS.ENVIRONMENT.DEV, CONSTANTS.ENVIRONMENT.DETA_SH].includes(process.env.NODE_ENV) && console.log("[LOG]",...args);
	},
	error: (...args) => {
		[CONSTANTS.ENVIRONMENT.DEV, CONSTANTS.ENVIRONMENT.DETA_SH].includes(process.env.NODE_ENV) && console.error("[ERROR]", ...args);
	}
};

export default LogUtil;