import CONSTANTS from "./constants.js";

const HeadersUtils = {
	/**
	 *
	 * @param {Http.Response} res
	 * @param {string | null} path
	 * @param {Object | null} stat
	 * @param {Http.Request | null} req
	 */
	setCspHeader: (res, path = null, stat = null, req = null) => {
		if(path && path.includes("index.html")) {
			let urlCspReport = res.req.protocol + "://" + res.req.headers.host + CONSTANTS.PATHS.CSP + "/report";
			res.setHeader(
				'Report-To',
				`{"group":"csp-endpoint","max_age":10886400,"endpoints":[{"url":"${urlCspReport}"}],"include_subdomains":true}`
			);
			res.setHeader(
				'Content-Security-Policy',
				"default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
			);
			return;
		}
		if(req) {
			let urlCspReport = req.protocol + "://" + req.headers.host + CONSTANTS.PATHS.CSP + "/report";
			res.setHeader(
				'Report-To',
				`{"group":"csp-endpoint","max_age":10886400,"endpoints":[{"url":"${urlCspReport}"}],"include_subdomains":true}`
			);
			res.setHeader(
				'Content-Security-Policy',
				"default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
			);
			return;
		}

	}
};

export default HeadersUtils;