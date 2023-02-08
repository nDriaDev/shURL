import {redirect} from "react-router-dom";
import CONSTANTS from "../../../utils/constants.js";

export default function activateUserPageLoader({request, param}) {
	try {
		let params = (new URL(request.url)).searchParams;
		if(params.get("token")) {
			return null;
		}
		throw Error("Not found");
	} catch (e) {
		return redirect(CONSTANTS.ROUTES.ERROR);
	}
}