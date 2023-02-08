import { dependencies } from './package.json';
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import ApiUtil from "./src/utils/apiUtil.js";

function renderChunks(deps) {
	let chunks = {};
	Object.keys(deps).forEach((key) => {
		if (['react', 'react-router-dom', 'react-dom', 'jotai', 'react-icons'].includes(key)) {
			return;
		}
		chunks[key] = [key];
	});
	return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		process.env.NODE_ENV === "development" ? basicSsl() : null
	],
	...(process.env.NODE_ENV === "development" && {
		server: {
			host: true,
			proxy: {
				[ApiUtil.URLS.SHURL.GENERATE.PATH]: 'http://localhost:3000',
				[ApiUtil.URLS.AUTH.SIGNUP.PATH]: 'http://localhost:3000',
				[ApiUtil.URLS.AUTH.SIGNIN.PATH]: 'http://localhost:3000',
				[ApiUtil.URLS.AUTH.ME.PATH]: 'http://localhost:3000',
				[ApiUtil.URLS.AUTH.ACTIVATE_USER.PATH]: 'http://localhost:3000',
				[ApiUtil.URLS.AUTH.FRG_PWD.PATH]: 'http://localhost:3000',
				[ApiUtil.URLS.AUTH.RESET_PWD.PATH]: 'http://localhost:3000',
				[ApiUtil.URLS.AUTH.LOGOUT.PATH]: 'http://localhost:3000',
			}
		}
	}),
	...(process.env.NODE_ENV === "production" && {
		build: {
			sourcemap: false,
			rollupOptions: {
				output: {
					manualChunks: {
						vendor: ['react', 'react-router-dom', 'react-dom', 'jotai', 'react-icons'],
						...renderChunks(dependencies),
					},
				},
			},
		},
	})
})
