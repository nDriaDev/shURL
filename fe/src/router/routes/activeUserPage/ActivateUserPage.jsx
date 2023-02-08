import {memo} from "react";
import ActivateUser from "../../../components/user/ActivateUser.jsx";

const ActivateUserPage = ({}) => {
	return (
		<ActivateUser/>
	)
};

ActivateUserPage.displayName = "ActivateUserPage";

export default memo(ActivateUserPage);