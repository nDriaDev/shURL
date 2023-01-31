import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import ApiUtil from "./src/utils/apiUtil.js";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		process.env.NODE_ENV === "development" ? basicSsl() : null
	],
	...(process.env.NODE_ENV === "development" ? {
		server: {
			host: true,
			proxy: {
				[ApiUtil.URLS.SHURL.GENERATE.PATH]: 'http://localhost:3000',
				[ApiUtil.URLS.AUTH.SIGNUP.PATH]: 'http://localhost:3000',
				[ApiUtil.URLS.AUTH.SIGNIN.PATH]: 'http://localhost:3000',
				[ApiUtil.URLS.AUTH.ME.PATH]: 'http://localhost:3000',
				[ApiUtil.URLS.AUTH.LOGOUT.PATH]: 'http://localhost:3000',
			}
		}
	} : {})
})
