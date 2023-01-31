import {useSetAtom} from "jotai";
import spinnerAtom from "../../store/spinnerStore.js";
import messagesAtom from "../../store/messagesStore.js";
import {useNavigate} from "react-router-dom";
import useFetch from "../common/useFetch.js";
import ApiUtil from "../../utils/apiUtil.js";
import CONSTANTS from "../../utils/constants.js";
import {MessageUtil} from "../../utils/messagesUtil.js";
import {useCallback, useRef} from "react";

/**
 *
 * @returns {{onChange: ((function(*): void)|*), login: ((function(*): Promise<void>)|*)}}
 */
export default function useLogin() {
	const setSpinner = useSetAtom(spinnerAtom);
	const setErrorMessage = useSetAtom(messagesAtom);
	const navigate = useNavigate();
	const form = useRef({ email:'', password:'' });
	const onChange = useCallback(e => {
		form.current[e.target.name] = e.target.value;
	}, []);

	const login = useCallback(async e => {
		e.preventDefault();
		setSpinner(true);
		setErrorMessage();
		try {
			const response = await useFetch({
				path: ApiUtil.URLS.AUTH.SIGNIN.PATH,
				method: ApiUtil.URLS.AUTH.SIGNIN.METHOD,
				body: form.current,
				bodyType: "json"
			})
			navigate(CONSTANTS.ROUTES.INITIAL);
		} catch (e) {
			setErrorMessage(MessageUtil.resolveErrorMessage(e));
		} finally {
			setSpinner(false);
		}
	}, []);

	return {
		login,
		onChange
	}
}