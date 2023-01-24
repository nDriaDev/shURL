import QRCode from "qrcode";

const urlUtil = {
	randomID: () => Math.random().toString(32).slice(6),
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