import { memo } from "react";
import { bool, func, oneOf, string } from 'prop-types';
import './ToggleSwitch.css';

const ToggleSwitch = ({ id, checked, onCheck, disabled, type }) => {
    const sliderClasses = type === 'rounded' ? "slider round" : "slider";

    return (
        <label className="switch">
            <input id={id} type="checkbox" role="switch" checked={checked} onChange={onCheck} disabled={disabled} />
            <span tabIndex="0" className={sliderClasses} aria-hidden="true"/>
        </label>
    )
}

ToggleSwitch.displayName = "ToggleSwitch";

ToggleSwitch.defaultProps = {
    disabled: false,
};

ToggleSwitch.propTypes = {
    id: string.isRequired,
    checked: bool.isRequired,
    onCheck: func.isRequired,
    disabled: bool,
    type: oneOf(["rounded", "squared"]).isRequired,
}

export default memo(ToggleSwitch);