import {memo} from "react";
import './ProfileButton.css';
import {Dropdown} from "../../dropdown/Dropdown.jsx";
import useProfileButton from "./useProfileButton.js";
import {IoMdLogOut, SlUser} from "react-icons/all.js";

const ProfileButton = ({}) => {
	const {me, logout} = useProfileButton();

	if(!me) {
		return null;
	}

	return (
		<Dropdown.DropdownContainer type="clickable">
			<Dropdown.DropdownLabel>
				<button className="profile-btn">
					<span style={{paddingRight: 4, fontSize: '0.875em', verticalAlign: 'sub'}}>{me.email}</span>
					<SlUser size="1.2em" style={{ verticalAlign: 'middle' }}/>
				</button>
			</Dropdown.DropdownLabel>
			<Dropdown.DropdownList alignRight={true}>
				<Dropdown.DropDownItem style={{textAlign: 'end'}} onClick={logout}>
					<IoMdLogOut size="1.2em" style={{ verticalAlign: 'sub', paddingRight: 4 }}/>
					Logout
				</Dropdown.DropDownItem>
			</Dropdown.DropdownList>
		</Dropdown.DropdownContainer>
	)
};

ProfileButton.displayName = "ProfileButton";

export default memo(ProfileButton);