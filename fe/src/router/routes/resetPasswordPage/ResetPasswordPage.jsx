import { memo } from "react";
import Form from "../../../components/form/Form.jsx";
import CONSTANTS from "../../../utils/constants.js";
import useTitle from "../../../components/common/useTitle.js";
import useMetaDescription from "../../../components/common/useMetaDescription.js";

const ResetPasswordPage = ({}) => {
    useTitle("ShURL - Reset password");
    useMetaDescription("Reset password");

    return (
        <Form type={CONSTANTS.FORM_TYPE.RESET_PWD}/>
    )
};

ResetPasswordPage.displayName = "ResetPasswordPage";

export default memo(ResetPasswordPage);