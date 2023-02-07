
import {redirect} from "react-router-dom";
import CONSTANTS from "../../../utils/constants.js";

export default async function signInPageLoader() {
	try {
		if(sessionStorage.getItem(CONSTANTS.STORAGE_VARS.ACCESS_TOKEN)) {
			return redirect(CONSTANTS.ROUTES.GENERATE);
		}
		return null;
	} catch (e) {
		return null;
	}
}