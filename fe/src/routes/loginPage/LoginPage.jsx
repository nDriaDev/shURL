import {useRef} from "react";
import { useCallback } from "react";
import { memo } from "react";
import {useNavigate} from "react-router-dom";
import './LoginPage.css';
import useFetch from "../../components/common/useFetch.js";
import ApiUtil from "../../utils/apiUtil.js";
import CONSTANTS from "../../utils/constants.js";
import {useSetAtom} from "jotai";
import spinnerAtom from "../../store/spinnerStore.js";
import messagesAtom from "../../store/messagesStore.js";
import {MessageUtil} from "../../utils/messagesUtil.js";

const LoginPage = ({}) => {
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

    return (
        <form className="login-form">
            <input placeholder="Email" type="email" name="email" onChange={onChange}/>
            <input placeholder="Password" type="password" name="password" onChange={onChange} />
            <button type="submit" onClick={login}>Accedi</button>
        </form>
    )
};

LoginPage.displayName = "LoginPage";

export default memo(LoginPage);