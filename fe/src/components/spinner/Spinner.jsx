import { memo } from "react";
import { bool, string } from 'prop-types';
import './Spinner.css';

const Spinner = ({className, show}) => {

    const classes = "lds-dual-ring" + (className ? ` ${className}` : '');

    if (!show) {
        return null;
    }

    return (
        <div className={classes}></div>
    )
};

Spinner.displayName = "Spinner";

Spinner.propTypes = {
    show: bool.isRequired,
    className: string,
    style: string
};

export default memo(Spinner);