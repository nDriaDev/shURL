import {useSetAtom} from "jotai";
import spinnerAtom from "../../store/spinnerStore.js";
import messagesAtom from "../../store/messagesStore.js";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import useFetch from "../common/useFetch.js";
import ApiUtil from "../../utils/apiUtil.js";
import CONSTANTS from "../../utils/constants.js";
import {MessageUtil} from "../../utils/messagesUtil.js";
import {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";

/**
 *
 * @param {{'sign-in' | 'sign-up' | 'forgot-pwd' | 'reset-pwd'}} formType
 * @returns {{switchFormType: ((function(*): void)|*), emailPlaceholder: (string), submit: ((function(*): Promise<void>)|*), onChange: ((function(*): void)|*), btnTextAndName: unknown, passwordPlaceholder: (string), resetBtnRef: React.MutableRefObject<undefined>, submitBtnText: (string), emailRef: React.MutableRefObject<undefined>}}
 */
export default function useForm(formType) {
	let [searchParams, ] = useSearchParams();
	const navigate = useNavigate();
	const location = useLocation();
	const setSpinner = useSetAtom(spinnerAtom);
	const setMessage = useSetAtom(messagesAtom);
	const form = useRef({ email: location?.state?.email || '', password:'' });
	const emailRef = useRef();
	const emailPlaceholder = formType === CONSTANTS.FORM_TYPE.RESET_PWD ? "Password" : "Email";
	const passwordPlaceholder = formType === CONSTANTS.FORM_TYPE.RESET_PWD ? "Confirm password" : "Password";
	const resetBtnRef = useRef();
	const submitBtnText = formType === CONSTANTS.FORM_TYPE.SIGN_IN ? "Sign in" : formType === CONSTANTS.FORM_TYPE.SIGN_UP ? "Sign up" : formType === CONSTANTS.FORM_TYPE.FORGOT_PWD ? "Reset" : "Confirm";
	const btnTextAndName = useMemo(() => {
		if(formType === CONSTANTS.FORM_TYPE.SIGN_IN) {
			return {
				name: CONSTANTS.FORM_TYPE.SIGN_UP,
				text: "Sign up",
			}
		} else {
			return {
				name: CONSTANTS.FORM_TYPE.SIGN_IN,
				text: "Sign in",
			}
		}
	}, [formType]);

	const onChange = useCallback(e => {
		form.current[e.target.name] = e.target.value;
	}, []);

	const switchFormType = useCallback(e => {
		setMessage();
		resetBtnRef.current.click();
		form.current = { email:'', password:'' };
		if(e.target.name === CONSTANTS.FORM_TYPE.SIGN_IN) {
			navigate(CONSTANTS.ROUTES.SIGNIN, {replace: true});
		}
		else if(e.target.name === CONSTANTS.FORM_TYPE.SIGN_UP) {
			navigate(CONSTANTS.ROUTES.SIGNUP, {replace: true});
		} else {
			navigate(CONSTANTS.ROUTES.FRG_PWD, {replace: true});
		}
	}, []);

	const submit = useCallback(async e => {
		e.preventDefault();
		setSpinner(true);
		setMessage();
		try {
			const {PATH: path, METHOD: method} = formType === CONSTANTS.FORM_TYPE.SIGN_IN ? ApiUtil.URLS.AUTH.SIGNIN : formType === CONSTANTS.FORM_TYPE.SIGN_UP ? ApiUtil.URLS.AUTH.SIGNUP : formType === CONSTANTS.FORM_TYPE.FORGOT_PWD ? ApiUtil.URLS.AUTH.FRG_PWD : ApiUtil.URLS.AUTH.RESET_PWD;
			const response = await useFetch({
				path,
				method,
				body: formType === CONSTANTS.FORM_TYPE.RESET_PWD ? {token: searchParams.get("token"), password: form.current.email, confirmPassword: form.current.password} : formType === CONSTANTS.FORM_TYPE.FORGOT_PWD ? {email: form.current.email} : form.current,
				bodyType: "json",
				...([CONSTANTS.FORM_TYPE.RESET_PWD, CONSTANTS.FORM_TYPE.FORGOT_PWD].includes(formType) ? {authenticated:false} : {})
			})
			if(formType === CONSTANTS.FORM_TYPE.SIGN_IN) {
				navigate(CONSTANTS.ROUTES.GENERATE);
			} else if(formType === CONSTANTS.FORM_TYPE.SIGN_UP) {
				setMessage(MessageUtil.resolveSuccessMessage(CONSTANTS.MESSAGES.SIGN_UP_COMPLETED));
			} else if(formType === CONSTANTS.FORM_TYPE.FORGOT_PWD) {
				setMessage(MessageUtil.resolveSuccessMessage(CONSTANTS.MESSAGES.FORGOT_PWD));
			} else {
				setMessage(MessageUtil.resolveSuccessMessage(CONSTANTS.MESSAGES.RESET_PWD));
			}
		} catch (e) {
			setMessage(MessageUtil.resolveErrorMessage(e));
		} finally {
			setSpinner(false);
		}
	}, [formType]);

	useEffect(() => {
		if(formType === CONSTANTS.FORM_TYPE.FORGOT_PWD && location?.state?.email) {
			emailRef.current.value = location.state.email;
		}
		if (formType === CONSTANTS.FORM_TYPE.RESET_PWD) {
			emailRef.current.setAttribute("type", "password");
		}
	}, []);

	return {
		btnTextAndName,
		submitBtnText,
		switchFormType,
		emailRef,
		emailPlaceholder,
		passwordPlaceholder,
		resetBtnRef,
		submit,
		onChange
	}
}