import {memo} from "react";
import useLogin from "./useLogin.js";

const Login = ({}) => {
	const {onChange, login} = useLogin();

	return (
		<form className="login-form">
			<input placeholder="Email" type="email" name="email" onChange={onChange}/>
			<input placeholder="Password" type="password" name="password" onChange={onChange} />
			<button type="submit" onClick={login}>Accedi</button>
		</form>
	)
};

export default memo(Login);