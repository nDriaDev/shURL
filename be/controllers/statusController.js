export default function statusController(req, res, next) {
	return res.status(200).json({code: 200, status: "RUNNING"});
}