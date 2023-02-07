import { memo } from "react";
import { bool, string } from 'prop-types';
import './Spinner.css';

const Spinner = ({className, show, useContainer}) => {

    const classes = "lds-dual-ring" + (className ? ` ${className}` : '');

    if (!show) {
        return null;
    }

    if(useContainer) {
        return (
            <div className="position-relative">
                <div className="spinner-container">
                    <div className={classes}></div>
                </div>
            </div>
        )
    }

    return (
        <div className="spinner-container">
            <div className={classes}></div>
        </div>
    )
};

Spinner.displayName = "Spinner";

Spinner.propTypes = {
    show: bool.isRequired,
    className: string,
    style: string,
    useContainer: bool,
};

export default memo(Spinner);