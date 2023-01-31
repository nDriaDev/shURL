export default class AppError extends Error {
	code;
	message;

	constructor({code, message}) {
		super(message);
		this.code = code;
		this.message = message
	}

	toString() {
		return `${this.code}:${Array.isArray(this.message) ? this.message.join('\n') : this.message}`;
	}

}