import {memo} from "react";
import useForm from "./useForm.js";
import './Form.css';
import CONSTANTS from "../../utils/constants.js";
import {oneOf} from "prop-types";

const Form = ({type}) => {
	const {resetBtnRef, switchFormType, onChange, submit, submitBtnText, btnTextAndName} = useForm(type);

	return (
		<form className="form">
			<input type="reset" value="Reset" hidden ref={resetBtnRef}/>
			<input placeholder="Email" type="email" name="email" onPaste={onChange} onChange={onChange}/>
			{
				type !== CONSTANTS.FORM_TYPE.FORGOT_PWD &&
				<input placeholder="Password" type="password" name="password" onPaste={onChange} onChange={onChange} />
			}
			<button type="submit" onClick={submit}>{submitBtnText}</button>
			{

				<div className="btn-container">
					<button name={btnTextAndName.name} type="button" className="btn-a" onClick={switchFormType}>{btnTextAndName.text}</button>
					{
						type !== CONSTANTS.FORM_TYPE.FORGOT_PWD &&
						<button
							name={CONSTANTS.FORM_TYPE.FORGOT_PWD}
							type="button"
							className="btn-a"
							onClick={switchFormType}
							disabled
						>
							Forgot password?
						</button>
					}
				</div>
			}
		</form>
	)
};

Form.displayName = "Form";

Form.propTypes = {
	type: oneOf(Object.values(CONSTANTS.FORM_TYPE)).isRequired,
}

export default memo(Form);