const UTILS = {
    formatErrors: errors => {
        return errors.map(el => `Parameter ${el.param}${["confirmPassword", "password"].includes(el.param) ? "": el.value === '' ? '=<stringa vuota>' : '='+el.value} in ${el.location} has produces follow validation error: ${el.msg}.`);
    }
};

export default UTILS;
