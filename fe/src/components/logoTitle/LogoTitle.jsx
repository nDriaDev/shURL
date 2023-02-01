import {memo} from "react";
import logo from './../../assets/download.svg';
import './LogoTitle.css';
import useLogoTitle from "./useLogoTitle.js";

const LogoTitle = () => {
	const {classes} = useLogoTitle();

	return (
		<div className='logo-container'>
			<div className={classes.containerText}>
				<span className={classes.translateText1}>Sh</span>
				<span className={classes.hideText}>ort</span>
				<span className={classes.translateText2}>URL</span>
				<img alt="Logo" fetchpriority="high" src={logo} className="logo"/>
			</div>
            <div className="nav-about">
                <a href="https://github.com/4ndr3wc0/shURL" target="_blank">Source</a>
                /
                <a href="https://github.com/4ndr3wC0" target="_blank">Author</a>
                /
                <a href="https://ndria.dev" target="_blank">Projects</a>
            </div>
		</div>
	)
};

LogoTitle.displayName = 'LogoTitle';

export default memo(LogoTitle);