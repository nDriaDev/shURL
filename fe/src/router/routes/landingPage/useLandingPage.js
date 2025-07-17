import CONSTANTS from "../../../utils/constants.js";
import {useCallback, useMemo} from "react";
import {useSetAtom} from "jotai";
import messagesAtom from "../../../store/messagesStore.js";

export default function useLandingPage() {
	const setMessages = useSetAtom(messagesAtom);

	const clearMessages = useCallback(e => setMessages(), []);

	const props = useMemo(() => {
		const animationClass = sessionStorage.getItem(CONSTANTS.STORAGE_VARS.TITLE_VIEWED) ? '' : 'landing-animation';
		return {
			hiddenSigns: !!sessionStorage.getItem(CONSTANTS.STORAGE_VARS.ACCESS_TOKEN),
			classes: {
				h2: 'landing-description ' + animationClass,
				h3: 'landing-description h2 ' + animationClass, 
				actionContainer: `action-container${sessionStorage.getItem(CONSTANTS.STORAGE_VARS.ACCESS_TOKEN) ? '-center' : ''} ${animationClass}`
			}
		}
	}, [sessionStorage.getItem(CONSTANTS.STORAGE_VARS.TITLE_VIEWED)]);

	return {
		props,
		clearMessages
	}
}