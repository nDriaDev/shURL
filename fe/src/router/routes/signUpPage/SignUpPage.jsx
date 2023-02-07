import { memo } from "react";
import Form from "../../../components/form/Form.jsx";
import CONSTANTS from "../../../utils/constants.js";
import useTitle from "../../../components/common/useTitle.js";
import useMetaDescription from "../../../components/common/useMetaDescription.js";

const SignUpPage = ({}) => {
    useTitle("ShURL - Sign up");
    useMetaDescription("Sign up");

    return (
        <Form type={CONSTANTS.FORM_TYPE.SIGN_UP}/>
    )
};

SignUpPage.displayName = "SignUpPage";

export default memo(SignUpPage);