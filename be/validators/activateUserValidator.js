import {query} from "express-validator";

const ActivateUserValidator = [
	query('activation_token')
		.exists().withMessage("no activation token provided")
];

export default ActivateUserValidator;