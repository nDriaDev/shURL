import { memo } from "react";
import Login from "../../components/login/Login.jsx";

const LoginPage = ({}) => {

    return (
        <Login/>
    )
};

LoginPage.displayName = "LoginPage";

export default memo(LoginPage);