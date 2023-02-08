import {memo} from "react";
import {Link, useSearchParams} from "react-router-dom";
import CONSTANTS from "../../utils/constants.js";
import useActivateUser from "./useActivateUser.js";
import {IoMdLogIn} from "react-icons/all.js";
import './ActivateUser.css';

const ActivateUser = ({}) => {
	const {mount, clearMessages} = useActivateUser();

	if(mount) {
		return null;
	}

	return (
		<div className="acu-container">
			<h2 className="acu-primary-text">
				You have successfully active your account!
			</h2>
			<h2 className="acu-default-text">
				Now you can sign in.
			</h2>
			<Link to={CONSTANTS.ROUTES.SIGNIN} onClick={clearMessages}>
				<button type="button">
					<IoMdLogIn size="1.2em" style={{ verticalAlign: 'sub', paddingRight: 4 }}/>
					Sign in
				</button>
			</Link>
		</div>
	)

};

ActivateUser.displayName = "ActivateUser";

export default memo(ActivateUser);