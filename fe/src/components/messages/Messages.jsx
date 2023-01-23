import { arrayOf, string } from "prop-types";
import { useMemo } from "react";
import { memo } from "react";
import './Messages.css';

const Messages = ({ defaultMessages, successMessages, warningMessages, errorMessages }) => {
    const Default = useMemo(() => {
        if (!defaultMessages) {
            return null;
        }
        return defaultMessages.map((el, index) => (
            <p key={"default"+index} className="text-default">
                {el}
            </p>
        ));
    }, [defaultMessages]);

    const Success = useMemo(() => {
        if (!successMessages) {
            return null;
        }
        return successMessages.map((el, index) => (
            <p key={"success"+index} className="text-success">
                {el}
            </p>
        ));
    }, [successMessages]);

    const Warning = useMemo(() => {
        if (!warningMessages) {
            return null;
        }
        return warningMessages.map((el, index) => (
            <p key={"warning"+index} className="text-warning">
                {el}
            </p>
        ));
    }, [warningMessages]);

    const Err = useMemo(() => {
        if (!errorMessages) {
            return null;
        }
        return errorMessages.map((el, index) => (
            <p key={"error"+index} className="text-error">
                {el}
            </p>
        ));
    }, [errorMessages]);

    return (<>
        {Default}
        {Success}
        {Warning}
        {Err}
    </>)
};

Messages.displayName = "Messages";

Messages.propTypes = {
    defaultMessages: arrayOf(string),
    successMessages: arrayOf(string),
    warningMessages: arrayOf(string),
    errorMessages: arrayOf(string),
}

export default memo(Messages);