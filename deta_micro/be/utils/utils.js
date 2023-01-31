export const UTILS = {
    formatErrors: errors => {
        return errors.map(el => `Il parametro ${el.param}=${el.value === '' ? '<stringa vuota>' : el.value} in ${el.location} ha generato il seguente errore di validazione: ${el.msg}.`);
    },
}