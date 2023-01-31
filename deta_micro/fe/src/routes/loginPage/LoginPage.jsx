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
import Login from "../../components/login/Login.jsx";

const LoginPage = ({}) => {

    return (
        <Login/>
    )
};

LoginPage.displayName = "LoginPage";

export default memo(LoginPage);