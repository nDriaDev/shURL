import {useAtom, useAtomValue, useSetAtom} from "jotai";
import messagesAtom from "../../../store/messagesStore.js";
import spinnerAtom from "../../../store/spinnerStore.js";
import {useLocation, useNavigate} from "react-router-dom";
import useFetch from "../../common/useFetch.js";
import ApiUtil from "../../../utils/apiUtil.js";
import CONSTANTS from "../../../utils/constants.js";
import {MessageUtil} from "../../../utils/messagesUtil.js";
import {useCallback} from "react";
import {authAtom} from "../../../store/authStore.js";

const useProfileButton = () => {
	const setMessage = useSetAtom(messagesAtom);
	const setSpinner = useSetAtom(spinnerAtom);
	const [me, setMe] = useAtom(authAtom);
	const navigate = useNavigate();
	const location = useLocation();

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
			navigate(CONSTANTS.ROUTES.SIGNIN, {replace: true});
		} catch (e) {
			setMessage(MessageUtil.resolveErrorMessage(e))
		} finally {
			setSpinner(false);
		}
	}, []);

	const resetPassword = useCallback(() => {
		setSpinner(true);
		setMessage();
		try {
			const data = useFetch({
				path: ApiUtil.URLS.AUTH.LOGOUT.PATH,
				method: ApiUtil.URLS.AUTH.LOGOUT.METHOD,
			});
			sessionStorage.removeItem(CONSTANTS.STORAGE_VARS.ACCESS_TOKEN);
			setMe(null);
			navigate(
				CONSTANTS.ROUTES.FRG_PWD,
				{
					replace: true,
					state: {
						email: me.email
					}
				}
			);
		} catch (e) {
			setMessage(MessageUtil.resolveErrorMessage(e))
		} finally {
			setSpinner(false);
		}
	}, [me]);

	const clearMessages = useCallback(() => {
		setMessage();
	}, []);

	return {
		me,
		resetPassword,
		logout,
		clearMessages,
		location
	}
}

export default useProfileButton;