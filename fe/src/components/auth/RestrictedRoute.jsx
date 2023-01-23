import {memo} from "react";
import {array, object, string} from "prop-types";
import {Navigate, Route} from "react-router-dom";

const RestrictedRoute = ({redirectTo, element})=> {
	if(localStorage.getItem('accessToken')) {
		const Component = element;
		return (<Component/>);
	} else {
		return <Navigate to={redirectTo ? redirectTo : '/login'} replace={true}/>
	}
};

RestrictedRoute.displayName = "RestrictedRoute";

RestrictedRoute.propTypes = {
	redirectTo: string,
	element: object.isRequired
}
export default memo(RestrictedRoute);