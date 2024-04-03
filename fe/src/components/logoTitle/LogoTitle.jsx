import {memo} from "react";
import {Link} from 'react-router-dom';
import logo from './../../assets/download.svg';
import './LogoTitle.css';
import useLogoTitle from "./useLogoTitle.js";
import CONSTANTS from '../../utils/constants.js';

const LogoTitle = () => {
	const {classes} = useLogoTitle();

	return (
		<div className='logo-container'>
			<h1 className={classes.containerText}>
				<Link to={CONSTANTS.ROUTES.INITIAL} className="logo">
					<span className={classes.translateText1}>Sh</span>
					<span className={classes.hideText}>ort</span>
					<span className={classes.translateText2}>URL</span>
					<img alt="Logo" fetchpriority="high" src={logo} className="logo"/>
				</Link>
			</h1>
            <div className="nav-about">
                <a href="https://github.com/nDriaDev/shURL" target="_blank">Source</a>
                /
                <a href="https://ndria.dev" target="_blank">Author</a>
                /
                <a href="https://github.com/nDriaDev?tab=repositories" target="_blank">Projects</a>
            </div>
		</div>
	)
};

LogoTitle.displayName = 'LogoTitle';

export default memo(LogoTitle);