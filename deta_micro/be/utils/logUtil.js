import morgan from 'morgan';

const LogUtil = {
	init: app => {
		if (process.env.NODE_ENV === 'development') {
			app.use(morgan('dev'));
		}
	},
	log: (...args) => {
		process.env.NODE_ENV === 'development' && console.log(...args);
	},
	error: (...args) => {
		process.env.NODE_ENV === 'development' && console.error(...args);
	}
};

export default LogUtil;