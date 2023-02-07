import { memo } from "react";
import Form from "../../../components/form/Form.jsx";
import CONSTANTS from "../../../utils/constants.js";
import useTitle from "../../../components/common/useTitle.js";
import useMetaDescription from "../../../components/common/useMetaDescription.js";

const SignInPage = ({}) => {
    useTitle("ShURL - Sign in");
    useMetaDescription("Sign in");

    return (
        <Form type={CONSTANTS.FORM_TYPE.SIGN_IN}/>
    )
};

SignInPage.displayName = "SignInPage";

export default memo(SignInPage);