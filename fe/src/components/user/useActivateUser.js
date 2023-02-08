import {useSearchParams} from "react-router-dom";
import {useSetAtom} from "jotai";
import spinnerAtom from "../../store/spinnerStore.js";
import messagesAtom from "../../store/messagesStore.js";
import apiUtil from "../../utils/apiUtil.js";
import useFetch from "../common/useFetch.js";
import {MessageUtil} from "../../utils/messagesUtil.js";
import {useCallback, useLayoutEffect, useRef, useState} from "react";

export default function useActivateUser() {
	let [searchParams, ] = useSearchParams();
	const setSpinner = useSetAtom(spinnerAtom);
	const setMessage = useSetAtom(messagesAtom);
	const [mount, setMount] = useState(true);
	const firstMountRef = useRef(true);

	const clearMessages = useCallback(() => setMessage(), []);

	useLayoutEffect(() => {
		async function activateUser() {
			try {
				if(!firstMountRef.current) {
					return;
				}
				setSpinner(true);
				setMessage();
				const {PATH, METHOD: method} = apiUtil.URLS.AUTH.ACTIVATE_USER;
				const response = await useFetch({
					path: PATH+`?activation_token=${searchParams.get("token")}`,
					method,
					authenticated: false,
				})
				setMount(false);
			} catch (e) {
				setMessage(MessageUtil.resolveErrorMessage(e));
			} finally {
				setSpinner(false);
			}
		}

		activateUser();

		return () => {
			firstMountRef.current = false;
		}
	},[]);

	return {
		mount,
		clearMessages
	}
}