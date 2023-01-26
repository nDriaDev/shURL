import { arrayOf, string } from "prop-types";
import { useMemo } from "react";
import { memo } from "react";
import './Messages.css';

const Messages = ({ info, success, warning, error }) => {
    const Info = useMemo(() => {
        if (!info) {
            return null;
        }
        return info.map((el, index) => (
            <p key={"default"+index} className="message text-default">
                {el}
            </p>
        ));
    }, [info]);

    const Success = useMemo(() => {
        if (!success) {
            return null;
        }
        return success.map((el, index) => (
            <p key={"success"+index} className="message text-success">
                {el}
            </p>
        ));
    }, [success]);

    const Warning = useMemo(() => {
        if (!warning) {
            return null;
        }
        return warning.map((el, index) => (
            <p key={"warning"+index} className="message text-warning">
                {el}
            </p>
        ));
    }, [warning]);

    const Err = useMemo(() => {
        if (!error) {
            return null;
        }
        return error.map((el, index) => (
            <p key={"error"+index} className="message text-error">
                {el}
            </p>
        ));
    }, [error]);

    return (<>
        {Info}
        {Success}
        {Warning}
        {Err}
    </>)
};

Messages.displayName = "Messages";

Messages.propTypes = {
    info: arrayOf(string),
    success: arrayOf(string),
    warning: arrayOf(string),
    error: arrayOf(string),
}

export default memo(Messages);