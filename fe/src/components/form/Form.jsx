import {memo} from "react";
import useForm from "./useForm.js";
import './Form.css';
import CONSTANTS from "../../utils/constants.js";
import {oneOf} from "prop-types";

const Form = ({type}) => {
	const {emailRef, emailPlaceholder, passwordPlaceholder, resetBtnRef, switchFormType, onChange, submit, submitBtnText, btnTextAndName} = useForm(type);

	return (
		<form className="form">
			<input type="reset" value="Reset" hidden ref={resetBtnRef}/>
			<input type="email" name="email" ref={emailRef} placeholder={emailPlaceholder} onPaste={onChange} onChange={onChange}/>
			{
				type !== CONSTANTS.FORM_TYPE.FORGOT_PWD &&
				<input type="password" name="password" placeholder={passwordPlaceholder} onPaste={onChange} onChange={onChange} />
			}
			{
				type === CONSTANTS.FORM_TYPE.SIGN_UP &&
				<p>
					By signing up, you agree to our 
					<a href="https://www.iubenda.com/privacy-policy/91918011" className="btn-a" title="Privacy Policy"> Privacy Policy</a>
				</p>
			}
			<button type="submit" onClick={submit}>{submitBtnText}</button>
			<div className="btn-container">
				<button name={btnTextAndName.name} type="button" className="btn-a" onClick={switchFormType}>{btnTextAndName.text}</button>
				{
					![CONSTANTS.FORM_TYPE.FORGOT_PWD, CONSTANTS.FORM_TYPE.RESET_PWD].includes(type) &&
					<button
						name={CONSTANTS.FORM_TYPE.FORGOT_PWD}
						type="button"
						className="btn-a"
						onClick={switchFormType}
					>
						Forgot password?
					</button>
				}
			</div>
		</form>
	)
};

Form.displayName = "Form";

Form.propTypes = {
	type: oneOf(Object.values(CONSTANTS.FORM_TYPE)).isRequired,
}

export default memo(Form);