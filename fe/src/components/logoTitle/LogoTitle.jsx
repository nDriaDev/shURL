import { memo } from "react";
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
          <img src={logo} className="logo" alt="logo" />
        </div>
      </div>
    )
};

LogoTitle.displayName = 'LogoTitle';

export default memo(LogoTitle);