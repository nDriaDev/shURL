import {useSetAtom} from "jotai";
import messagesAtom from "../../../store/messagesStore.js";
import spinnerAtom from "../../../store/spinnerStore.js";
import {useNavigate} from "react-router-dom";
import useFetch from "../../common/useFetch.js";
import ApiUtil from "../../../utils/apiUtil.js";
import CONSTANTS from "../../../utils/constants.js";
import {MessageUtil} from "../../../utils/messagesUtil.js";
import {useCallback} from "react";
import meAtom from "../../../store/meStore.js";

const useProfileButton = () => {
	const setMessage = useSetAtom(messagesAtom);
	const setSpinner = useSetAtom(spinnerAtom);
	const setMe = useSetAtom(meAtom);
	const navigate = useNavigate();

	const logout = useCallback(async e => {
		setSpinner(true);
		setMessage();
		try {
			const data = useFetch({
				path: ApiUtil.URLS.AUTH.LOGOUT.PATH,
				method: ApiUtil.URLS.AUTH.LOGOUT.METHOD,
			});
			sessionStorage.removeItem(CONSTANTS.STORAGE_VARS.ACCESS_TOKEN);
			setMe(null);
			navigate(CONSTANTS.ROUTES.LOGIN);
		} catch (e) {
			setMessage(MessageUtil.resolveErrorMessage(e))
		} finally {
			setSpinner(false);
		}
	}, []);

	return {
		logout
	}
}

export default useProfileButton;