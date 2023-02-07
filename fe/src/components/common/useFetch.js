import CONSTANTS from "../../utils/constants.js";

/**
 * @param {Object} obj
 * @param {string} obj.path
 * @param {Object} [obj.body]
 * @param {"form-encoded" | "json"} [obj.bodyType]
 * @param {"GET" | "POST" | "PUT" | "DELETE"} obj.method
 * @param {Object} [obj.headers]
 * @returns {Promise<string|Object>}
 */
const useFetch = async ({path, body=null, bodyType="json", method, headers=null}={}) => {
	try {
		let headersToSend = {
			"Authorization": `Bearer ${sessionStorage.getItem(CONSTANTS.STORAGE_VARS.ACCESS_TOKEN)}`,
			...(headers ? headers : {}),
			...(body ? {"Content-Type": bodyType === "json" ? "application/json" : "application/x-www-form-urlencoded;charset=UTF-8"} : {})
		};
		let bodyToSend;
		if(body) {
			if(bodyType === 'json') {
				bodyToSend = JSON.stringify(body);
			} else {
				bodyToSend = [];
				for(let property in body) {
					let key = encodeURIComponent(property);
					let value = encodeURIComponent(body[property]);
					bodyToSend.push(key+"="+value);
				}
				bodyToSend = bodyToSend.join("&");
			}
		}
		const response = await fetch(
			path,
			{
				method,
				headers: headersToSend,
				...(bodyToSend ? {body: bodyToSend} : {})
			}
		);
		let data = response.headers.get("Content-Type").startsWith("text") ? await response.text() : await response.json();
		if(!response.ok) {
			if(response.status === CONSTANTS.HTTP_CODE.UNAUTHORIZED && !window.location.pathname.includes(CONSTANTS.ROUTES.SIGNIN)) {
				console.error("Unauthorized");
				throw Error(CONSTANTS.HTTP_CODE.UNAUTHORIZED);
			}
			let mess = data.message ? (Array.isArray(data.message) ? data.message.join("\n") : data.message) : response.statusText;
			console.error(data.code || response.status +": "+mess);
			throw Error(mess);
		} else {
			const access_token = response.headers.get("Authorization");
			access_token && sessionStorage.setItem(CONSTANTS.STORAGE_VARS.ACCESS_TOKEN, access_token);
			return data;
		}
	} catch (e) {
		window.scrollTo(0,0);
		throw e;
	}
};

export default useFetch;