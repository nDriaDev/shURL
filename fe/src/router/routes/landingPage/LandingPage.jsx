import {memo} from "react";
import './LandingPage.css';
import CONSTANTS from "../../../utils/constants.js";
import {Link} from "react-router-dom";
import {BiLink, IoMdLogIn, RiGradienterLine} from "react-icons/all.js";
import useLandingPage from "./useLandingPage.js";
import useTitle from "../../../components/common/useTitle.js";

const LandingPage = ({}) => {
	const {classes, clearMessages} = useLandingPage();

	return (<>
		<h2 className={classes.h2}>
			Create short URL easily
		</h2>
		<h2 className={classes.h2}>
			with qrcode!
		</h2>
		<div className={classes.actionContainer}>
			<Link to={CONSTANTS.ROUTES.SIGNIN} onClick={clearMessages}>
				<button type="button">
					<IoMdLogIn size="1.2em" style={{ verticalAlign: 'sub', paddingRight: 4 }}/>
					Sign in
				</button>
			</Link>
			<Link to={CONSTANTS.ROUTES.GENERATE} onClick={clearMessages}>
				<button type="button">
					<BiLink size="1.2em" style={{ verticalAlign: 'sub', paddingRight: 4 }}/>
					Create
				</button>
			</Link>
			<Link to={CONSTANTS.ROUTES.SIGNUP} onClick={clearMessages}>
				<button type="button">
					<RiGradienterLine size="1.2em" style={{ verticalAlign: 'sub', paddingRight: 4 }}/>
					Sign up
				</button>
			</Link>
		</div>
	</>)
};

LandingPage.displayName = "LandingPage";

export default memo(LandingPage);