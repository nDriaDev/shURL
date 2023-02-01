import {memo} from "react";
import useLogin from "./useLogin.js";
import './Login.css';

const Login = ({}) => {
	const {resetBtnRef, FORM_TYPE, formType, switchFormType, onChange, submit} = useLogin();
	const submitBtnText = formType === FORM_TYPE.LOGIN ? "Login" : formType === FORM_TYPE.REGISTER ? "Registrati" : "Reset";
	const loginRegisterBtnText = formType === FORM_TYPE.REGISTER ? 'Login' : 'Registrati';

	return (
		<form className="login-form">
			<input type="reset" value="Reset" hidden ref={resetBtnRef}/>
			<input placeholder="Email" type="email" name="email" onPaste={onChange} onChange={onChange}/>
			{
				formType !== FORM_TYPE.FORGOT_PWD &&
				<input placeholder="Password" type="password" name="password" onPaste={onChange} onChange={onChange} />
			}
			<button type="submit" onClick={submit}>{submitBtnText}</button>
			<div className="btn-container">
				<button name={FORM_TYPE.LOGIN} type="button" className="btn-a" onClick={switchFormType}>{loginRegisterBtnText}</button>
				<button name={FORM_TYPE.FORGOT_PWD} type="button" className="btn-a" onClick={switchFormType} disabled>Password dimenticata?</button>
			</div>
		</form>
	)
};

export default memo(Login);