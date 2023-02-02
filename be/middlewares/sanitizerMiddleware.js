import {body, param, query} from "express-validator";

/**
 * @param {[string]} fields
 * @param {"params" | "query" | "body"}type
 */
export default function sanitizerMiddleware(fields, type) {
	let sanitizer = fields.reduce((prev,curr) => {
		if(type === "query") {
			prev.push(
				query(curr)
					.customSanitizer(value => value === "" ? null : value)
			)
		} else if(type === "params") {
			prev.push(
				param(curr)
					.customSanitizer(value => value === "" ? null : value)
			)
		} else {
			prev.push(
				body(curr)
					.customSanitizer(value => value === "" ? null : value)
			)
		}
		return prev;
	}, []);
	return sanitizer;
}