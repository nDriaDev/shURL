import CONSTANTS from "./constants.js";
import {MessageUtil} from "./messagesUtil.js";

export const ErrorUtil = {
	/**
	 *
	 * @param {Error} error
	 * @param {Function} messageFunc
	 * @param {Function}spinnerFunc
	 */
	handlingError: (error, messageFunc, spinnerFunc=null) => {
		if(error.message === CONSTANTS.HTTP_CODE.UNAUTHORIZED.toString()) {
			sessionStorage.removeItem(CONSTANTS.STORAGE_VARS.ACCESS_TOKEN);
			window.location.replace(CONSTANTS.ROUTES.LOGIN);
		} else {
			messageFunc(MessageUtil.resolveErrorMessage(error));
			spinnerFunc !== null && spinnerFunc(false);
		}
	}
}