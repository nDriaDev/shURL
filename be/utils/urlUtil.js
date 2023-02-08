import QRCode from "qrcode";
import CONSTANTS from "./constants.js";

const urlUtil = {
	randomID: () => Math.random().toString(32).slice(6),
	activateUserUrl: (req, token) => `${req.protocol}://${req.get('host')}${CONSTANTS.PATHS.FE.ACTIVATE_USER}?token=${token}`,
	shortUrl: (req, code) => req.protocol+'://'+req.get('host')+'/'+code,
	qrCode: async (shortUrl) => await QRCode.toDataURL(shortUrl),
	isValidUrl: str => {
		try {
			let url = new URL(str);
			return ["https:", "http:"].includes(url.protocol);
		} catch (error) {
			return false;
		}
	},
}

export default urlUtil;