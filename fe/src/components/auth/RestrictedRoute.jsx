import {memo} from "react";
import {array, object, string} from "prop-types";
import {Navigate, Route} from "react-router-dom";
import CONSTANTS from "../../utils/constants.js";

const RestrictedRoute = ({redirectTo, element})=> {
	if(sessionStorage.getItem(CONSTANTS.STORAGE_VARS.ACCESS_TOKEN)) {
		const Component = element;
		return (<Component/>);
	} else {
		return <Navigate to={redirectTo ? redirectTo : CONSTANTS.ROUTES.LOGIN} replace={true}/>
	}
};

RestrictedRoute.displayName = "RestrictedRoute";

RestrictedRoute.propTypes = {
	redirectTo: string,
	element: object.isRequired
}
export default memo(RestrictedRoute);