const API_BASE_PATH="/api";
const API_PATHS={
	AUTH: '/auth',
	SHURL: '/shurl'
};
const ApiUtil = {
	URLS: {
		AUTH: {
			ACTIVATE_USER: {
				PATH:API_BASE_PATH+API_PATHS.AUTH + `/activate`,
				METHOD: 'GET'
			},
			FRG_PWD: {
				PATH:API_BASE_PATH+API_PATHS.AUTH + '/forgotPassword',
				METHOD: 'POST'
			},
			SIGNUP: {
				PATH:API_BASE_PATH+API_PATHS.AUTH + '/signup',
				METHOD: 'POST'
			},
			SIGNIN: {
				PATH:API_BASE_PATH+API_PATHS.AUTH + '/signin',
				METHOD: 'POST'
			},
			REFRESH: {
				PATH:API_BASE_PATH+API_PATHS.AUTH + '/refresh',
				METHOD: 'GET'
			},
			ME: {
				PATH:API_BASE_PATH+API_PATHS.AUTH + '/me',
				METHOD: 'GET'
			},
			LOGOUT: {
				PATH:API_BASE_PATH+API_PATHS.AUTH + '/logout',
				METHOD: 'GET'
			}
		},
		SHURL: {
			GENERATE: {
				PATH:API_BASE_PATH+API_PATHS.SHURL+'/generate',
				METHOD: 'POST'
			}
		}
	}
}

export default ApiUtil;