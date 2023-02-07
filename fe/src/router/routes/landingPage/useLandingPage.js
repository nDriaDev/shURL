import CONSTANTS from "../../../utils/constants.js";
import {useCallback, useMemo} from "react";
import {useSetAtom} from "jotai";
import messagesAtom from "../../../store/messagesStore.js";

export default function useLandingPage() {
	const setMessages = useSetAtom(messagesAtom);

	const clearMessages = useCallback(e => setMessages(), []);

	const classes = useMemo(() => {
		const animationClass = sessionStorage.getItem(CONSTANTS.STORAGE_VARS.TITLE_VIEWED) ? '' : 'landing-animation';
		return {
			h2: 'landing-description ' + animationClass,
			actionContainer: 'action-container ' + animationClass
		}
	}, [sessionStorage.getItem(CONSTANTS.STORAGE_VARS.TITLE_VIEWED)]);

	return {
		classes,
		clearMessages
	}
}