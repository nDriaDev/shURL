export const UTILS = {
    randomID: () => Math.random().toString(32).slice(6),
    isValidUrl: str => {
        try {
            let url = new URL(str);
            return ["https:", "http:"].includes(url.protocol);
        } catch (error) {
            return false;
        }
    },
    formatErrors: errors => {
        return errors.map(el => `Il parametro ${el.param}=${el.value === '' ? '<stringa vuota>' : el.value} in ${el.location} ha generato il seguente errore di validazione: ${el.msg}.`);
    },
}
