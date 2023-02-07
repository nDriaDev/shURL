const UTILS = {
    formatErrors: errors => {
        return errors.map(el => `Parameter ${el.param}${el.param === "password" ? "": el.value === '' ? '=<stringa vuota>' : '='+el.value} in ${el.location} has produces follow validation error: ${el.msg}.`);
    }
};

export default UTILS;
