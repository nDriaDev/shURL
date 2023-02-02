import {body, param, query} from "express-validator";

/**
 *
 * @param {Object} params
 * @param {[string]} params.fields
 * @param {"params" | "query" | "body"} params.type
 * @param {(any)=>any} [params.customFunc]
 * @returns {array}
 */
export default function sanitizerMiddleware({fields, type, customFunc}) {
	let sanitizer = fields.reduce((prev,curr) => {
		if(type === "query") {
			prev.push(
				query(curr)
					.customSanitizer(value => customFunc ? customFunc(value) : value === "" ? null : value)
			)
		} else if(type === "params") {
			prev.push(
				param(curr)
					.customSanitizer(value => customFunc ? customFunc(value) : value === "" ? null : value)
			)
		} else {
			prev.push(
				body(curr)
					.customSanitizer(value => customFunc ? customFunc(value) : value === "" ? null : value)
			)
		}
		return prev;
	}, []);
	return sanitizer;
}