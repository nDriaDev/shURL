import LogUtil from "../utils/logUtil.js";
import CONSTANTS from "../utils/constants.js";

const cspController = {
	report: dbClient => (req, res, next) => {
		try {
			LogUtil.log("cspController report: START");
			LogUtil.log(req.body);
			res.status(CONSTANTS.HTTP_CODE.SUCCESS.OK.code).send("OK");
		} catch (e) {
			next(e);
		} finally {
			LogUtil.log("cspController report: FINISH");
		}
	}
}

export default cspController;