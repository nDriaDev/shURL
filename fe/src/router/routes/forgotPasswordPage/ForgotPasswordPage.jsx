import { memo } from "react";
import Form from "../../../components/form/Form.jsx";
import CONSTANTS from "../../../utils/constants.js";
import useTitle from "../../../components/common/useTitle.js";
import useMetaDescription from "../../../components/common/useMetaDescription.js";

const ForgotPasswordPage = ({}) => {
    useTitle("ShURL - Forgot password");
    useMetaDescription("Reset password");
    
    return (
        <Form type={CONSTANTS.FORM_TYPE.FORGOT_PWD}/>
    )
};

ForgotPasswordPage.displayName = "ForgotPasswordPage";

export default memo(ForgotPasswordPage);