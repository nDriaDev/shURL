const CONSTANTS = {
	ROUTES: {
		WILDCARD: '*',
		INITIAL: '/',
		LOGIN: '/login',
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
			label: "30 minuti",
			value: 0.30
		},
		{
			label: "2 ore",
			value: 2
		},
		{
			label: "4 ore",
			value: 4
		},
		{
			label: "8 ore",
			value: 8
		},
		{
			label: "12 ore",
			value: 12
		},
		{
			label: "1 giorno",
			value: 24
		},
	],
};

export default CONSTANTS;