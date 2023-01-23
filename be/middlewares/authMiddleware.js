import auth from "../utils/authUtil.js";

export default function (req, res, next) {
    auth.verifyToken(req);
    if (req.user) {
        next();
    } else {
        throw Error("Unauthorized");
    }
}