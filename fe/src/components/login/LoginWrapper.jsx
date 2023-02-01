import {memo} from "react";
import {array, object, string} from "prop-types";
import {Navigate, Route} from "react-router-dom";
import CONSTANTS from "../../utils/constants.js";
import LoginPage from "../../routes/loginPage/LoginPage.jsx";

const LoginWrapper = ({})=> {
	if(sessionStorage.getItem(CONSTANTS.STORAGE_VARS.ACCESS_TOKEN)) {
		return <Navigate to={CONSTANTS.ROUTES.INITIAL}/>
	} else {
		return <LoginPage/>
	}
};

LoginWrapper.displayName = "LoginWrapper";

export default memo(LoginWrapper);