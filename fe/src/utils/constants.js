const CONSTANTS = {
	ROUTES: {
		WILDCARD: '*',
		INITIAL: '/',
		GENERATE: '/generate',
		ACTIVATE_USER: '/activate',
		RESET_PWD: '/resetPassword',
		SIGNIN: '/signIn',
		SIGNUP: '/signUp',
		FRG_PWD: '/forgotPassword',
		ERROR: '/error',
	},
	STORAGE_VARS: {
		ACCESS_TOKEN: "acc-tkn",
		TITLE_VIEWED: "titl-vwd"
	},
	HTTP_CODE: {
		UNAUTHORIZED: 401
	},
	EXPIRE_URL_IN: [
		{
			label: "30 minutes",
			value: 0.5
		},
		{
			label: "4 hours",
			value: 4
		},
		{
			label: "12 hours",
			value: 12
		},
		{
			label: "1 day",
			value: 24
		},
		{
			label: "1 week",
			value: 168
		},
		{
			label: "All time",
			value: -1
		},
	],
	FORM_TYPE: {
		SIGN_IN: 'sign-in',
		SIGN_UP: 'sign-up',
		FORGOT_PWD: 'forgot-pwd',
		RESET_PWD: 'reset-pwd'
	},
	MESSAGES: {
		SIGN_UP_COMPLETED: "Thanks for signing in!\nAn email with an activation link has been sent to your address.\nIt expires in 2 hours.",
		FORGOT_PWD: "An email has been sent to your address with a link to reset password.\nIt expires in 2 hours.",
		RESET_PWD: "Password has been successfully reset.\nNow you can sign in.",
		ALL_TIME_ERROR: "You must be logged in to generate permanent short urls."
	}
};

export default CONSTANTS;