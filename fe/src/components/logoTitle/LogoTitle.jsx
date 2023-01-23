import { memo } from "react";
import logo from './../../assets/download.svg';
import './LogoTitle.css';

const LogoTitle = () => {
    return (
        <div className='logo-container'>
        <div className='text'>
          <span className='translate-text-1'>Sh</span>
          <span className='hide-text'>ort</span>
          <span className='translate-text-2'>URL</span>
          <img src={logo} className="logo" alt="logo" />
        </div>
      </div>
    )
};

LogoTitle.displayName = 'LogoTitle';

export default memo(LogoTitle);