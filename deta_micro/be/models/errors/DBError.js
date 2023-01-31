export default class DBError extends Error {
    code;
    message;
    constructor({message, code}) {
        super(message);
        this.code = code;
    }

    toString() {
        return `${this.code}: ${this.message}`;
    }
}