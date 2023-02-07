import {useSetAtom} from "jotai";
import spinnerAtom from "../../store/spinnerStore.js";
import messagesAtom from "../../store/messagesStore.js";
import {useNavigate} from "react-router-dom";
import useFetch from "../common/useFetch.js";
import ApiUtil from "../../utils/apiUtil.js";
import CONSTANTS from "../../utils/constants.js";
import {MessageUtil} from "../../utils/messagesUtil.js";
import {useCallback, useLayoutEffect, useMemo, useRef, useState} from "react";

/**
 *
 * @param {{'sign-in' | 'sign-up' | 'forgot-pwd'}} formType
 * @returns {{switchFormType: ((function(*): void)|*), submit: ((function(*): Promise<void>)|*), onChange: ((function(*): void)|*), loginRegisterBtnText: (string), resetBtnRef: React.MutableRefObject<undefined>, submitBtnText: (string)}}
 */
export default function useForm(formType) {
	const setSpinner = useSetAtom(spinnerAtom);
	const setMessage = useSetAtom(messagesAtom);
	const navigate = useNavigate();
	const form = useRef({ email:'', password:'' });
	const resetBtnRef = useRef();
	const submitBtnText = formType === CONSTANTS.FORM_TYPE.SIGN_IN ? "Sign in" : formType === CONSTANTS.FORM_TYPE.SIGN_UP ? "Sign up" : "Reset";
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
			const {PATH: path, METHOD: method} = formType === CONSTANTS.FORM_TYPE.SIGN_IN ? ApiUtil.URLS.AUTH.SIGNIN : formType === CONSTANTS.FORM_TYPE.SIGN_UP ? ApiUtil.URLS.AUTH.SIGNUP : ApiUtil.URLS.AUTH.FRG_PWD;
			const response = await useFetch({
				path,
				method,
				body: formType === CONSTANTS.FORM_TYPE.FORGOT_PWD ? {email: form.current.email} : form.current,
				bodyType: "json"
			})
			if(formType === CONSTANTS.FORM_TYPE.SIGN_IN) {
				navigate(CONSTANTS.ROUTES.GENERATE, {replace: true});
			} else if(formType === CONSTANTS.FORM_TYPE.SIGN_UP) {
				setMessage(MessageUtil.resolveSuccessMessage(CONSTANTS.MESSAGES.SIGN_UP_COMPLETED));
			} else {
				setMessage(MessageUtil.resolveSuccessMessage(CONSTANTS.MESSAGES.RESET_PWD));
			}
		} catch (e) {
			setMessage(MessageUtil.resolveErrorMessage(e));
		} finally {
			setSpinner(false);
		}
	}, [formType]);

	return {
		btnTextAndName,
		submitBtnText,
		switchFormType,
		resetBtnRef,
		submit,
		onChange
	}
}