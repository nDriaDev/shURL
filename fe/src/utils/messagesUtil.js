/**
 *
 * @param {Object} payload
 * @param {Error} [payload.error]
 * @param {string} [payload.message]
 * @param {"error" | "warning" | "info" | "success" } [payload.type]
 * @returns {{message: (*|string), type}}
 */
const resolveBeMessages = ({error, message, type}) => {
    return {
        message: error?.message || message || "",
        type
    }
}
export const MessageUtil = {
    /**
     *
     * @param {Error | string} error
     * @returns {{message: (*|string), type}}
     */
    resolveErrorMessage: error => {
        if(typeof error === "string") {
            return resolveBeMessages({message:error, type:'error'});
        }
        return resolveBeMessages({error, type: "error"})
    },
    /**
     *
     * @param {string} msg
     * @returns {{message: (*|string), type}}
     */
    resolveSuccessMessage: msg => resolveBeMessages({message:msg, type: "success"})
}