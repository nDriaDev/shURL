import {useSetAtom} from "jotai";
import spinnerAtom from "../../store/spinnerStore.js";
import messagesAtom from "../../store/messagesStore.js";
import {useNavigate} from "react-router-dom";
import useFetch from "../common/useFetch.js";
import ApiUtil from "../../utils/apiUtil.js";
import CONSTANTS from "../../utils/constants.js";
import {MessageUtil} from "../../utils/messagesUtil.js";
import {useCallback, useMemo, useRef, useState} from "react";

/**
 *
 * @returns {{formType: string, switchFormType: ((function(*): void)|*), submit: ((function(*): Promise<void>)|*), onChange: ((function(*): void)|*), FORM_TYPE: {REGISTER: string, FORGOT_PWD: string, LOGIN: string}}}
 */
export default function useLogin() {
	const setSpinner = useSetAtom(spinnerAtom);
	const setErrorMessage = useSetAtom(messagesAtom);
	const navigate = useNavigate();
	const form = useRef({ email:'', password:'' });
	const FORM_TYPE = useMemo(() => ({
		LOGIN: 'login',
		REGISTER: 'register',
		FORGOT_PWD: 'forgot-pwd'
	}), []);
	const [formType, setFormType] = useState(FORM_TYPE.LOGIN);

	const onChange = useCallback(e => {
		form.current[e.target.name] = e.target.value;
	}, []);

	const switchFormType = useCallback(e => {
		if(e.target.name === FORM_TYPE.LOGIN) {
			setFormType(ft => {
				if(ft === FORM_TYPE.FORGOT_PWD) {
					return FORM_TYPE.REGISTER;
				}
				return ft === FORM_TYPE.LOGIN ? FORM_TYPE.REGISTER : FORM_TYPE.LOGIN;
			})
		}
		if(e.target.name === FORM_TYPE.FORGOT_PWD) {
			setFormType(FORM_TYPE.FORGOT_PWD);
		}
	}, []);

	const submit = useCallback(async e => {
		e.preventDefault();
		setSpinner(true);
		setErrorMessage();
		try {
			const {PATH: path, METHOD: method} = formType === FORM_TYPE.LOGIN ? ApiUtil.URLS.AUTH.SIGNIN : ApiUtil.URLS.AUTH.SIGNUP;
			const response = await useFetch({
				path,
				method,
				body: form.current,
				bodyType: "json"
			})
			navigate(CONSTANTS.ROUTES.INITIAL);
		} catch (e) {
			setErrorMessage(MessageUtil.resolveErrorMessage(e));
		} finally {
			setSpinner(false);
		}
	}, [formType]);

	return {
		FORM_TYPE,
		formType,
		switchFormType,
		submit,
		onChange
	}
}