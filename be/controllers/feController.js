import * as url from 'url';
import path from "path";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default function feController(req, res, next) {
		let pathname = new URL(req.originalUrl, import.meta.url).pathname;
		if (pathname.startsWith("/api")) {
			next();
		} else {
			return res.sendFile(path.join(__dirname, '/../../fe/dist', 'index.html'));
		}
}

