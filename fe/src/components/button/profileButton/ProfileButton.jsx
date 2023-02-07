import {memo, useMemo} from "react";
import './ProfileButton.css';
import {Dropdown} from "../../dropdown/Dropdown.jsx";
import useProfileButton from "./useProfileButton.js";
import {BiReset, IoMdLogIn, IoMdLogOut, SlUser} from "react-icons/all.js";
import {Link} from "react-router-dom";
import CONSTANTS from "../../../utils/constants.js";

const ProfileButton = ({}) => {
	const {me, logout, location, resetPassword, clearMessages} = useProfileButton();

	const Btn = useMemo(() => {
		if(location.pathname !== CONSTANTS.ROUTES.GENERATE) {
			return null;
		}
		if(me && sessionStorage.getItem(CONSTANTS.STORAGE_VARS.ACCESS_TOKEN)) {
			return (
				<Dropdown.DropdownContainer type="clickable">
				<Dropdown.DropdownLabel>
					<button className="profile-btn">
						<span style={{paddingRight: 4, fontSize: '0.875em', verticalAlign: 'sub'}}>{me.email}</span>
						<SlUser size="1.2em" style={{ verticalAlign: 'middle' }}/>
					</button>
				</Dropdown.DropdownLabel>
				<Dropdown.DropdownList alignRight={true}>
					<Dropdown.DropDownItem style={{textAlign: 'end'}} onClick={resetPassword} disabled={true}>
						<BiReset size="1.2em" style={{ verticalAlign: 'sub', paddingRight: 4 }}/>
						Reset password
					</Dropdown.DropDownItem>
					<Dropdown.DropDownItem style={{textAlign: 'end'}} onClick={logout}>
						<IoMdLogOut size="1.2em" style={{ verticalAlign: 'sub', paddingRight: 4 }}/>
						Logout
					</Dropdown.DropDownItem>
				</Dropdown.DropdownList>
			</Dropdown.DropdownContainer>
			);
		} else {
			return (
				<Link to={CONSTANTS.ROUTES.SIGNIN} replace={true}>
					<button type="button" onClick={clearMessages}>
						<IoMdLogIn size="1.2em" style={{ verticalAlign: 'sub', paddingRight: 4 }}/>
						Sign in
					</button>
				</Link>
			)
		}
	}, [location.pathname, logout, me]);

	return (<>
		{Btn}
	</>)
};

ProfileButton.displayName = "ProfileButton";

export default memo(ProfileButton);