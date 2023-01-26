import {memo} from "react";
import './ProfileButton.css';
import {Dropdown} from "../../dropdown/Dropdown.jsx";
import useProfileButton from "./useProfileButton.js";

const ProfileButton = ({}) => {
	const {logout} = useProfileButton();

	return (
		<Dropdown.DropdownContainer type="clickable">
			<Dropdown.DropdownLabel>
				<button className="profile-btn">
					<svg width="30px" height="30px" viewBox="-2.4 -2.4 28.80 28.80" xmlns="http://www.w3.org/2000/svg"
						 stroke="#a6a6a6">
						<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
						<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<path
								d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
								fill="#000000"></path>
							<path
								d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z"
								fill="#000000"></path>
						</g>
					</svg>
				</button>
			</Dropdown.DropdownLabel>
			<Dropdown.DropdownList alignRight={true}>
				<Dropdown.DropDownItem onClick={logout}>
					Logout
				</Dropdown.DropDownItem>
			</Dropdown.DropdownList>
		</Dropdown.DropdownContainer>
	)
};

ProfileButton.displayName = "ProfileButton";

export default memo(ProfileButton);