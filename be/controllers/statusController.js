import LogUtil from "../utils/logUtil.js";

export default function statusController(req, res, next) {
	try {
		LogUtil.log("statusController: START");
		return res.status(200).json({code: 200, status: "RUNNING"});
	} catch (e) {
		next(e);
	} finally {
		LogUtil.log("statusController: FINISH");
	}
}