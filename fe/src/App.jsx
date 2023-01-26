import './App.css';
import LogoTitle from './components/logoTitle/LogoTitle';
import ErrorPage from './routes/errorPage/ErrorPage';
import {Route, BrowserRouter, Routes, Navigate, redirect} from 'react-router-dom';
import ShurlPage from './routes/shurlPage/ShurlPage';
import LoginPage from './routes/loginPage/LoginPage';
import RestrictedRoute from "./components/auth/RestrictedRoute.jsx";
import { useAtomValue } from "jotai";
import spinnerAtom from "./store/spinnerStore.js";
import Spinner from "./components/spinner/Spinner.jsx";
import ErrorRoutePage from "./routes/errorPage/ErrorRoutePage.jsx";
import CONSTANTS from "./utils/constants.js";
import Messages from "./components/messages/Messages.jsx";
import messagesAtom from "./store/messagesStore.js";

function App() {
	const spinner = useAtomValue(spinnerAtom);
	const messages = useAtomValue(messagesAtom);

	return (
		<div className="App">
			<LogoTitle />
			<div className="position-relative">
				<Spinner show={spinner}/>
				{/*<RouterProvider router={router}/>*/}
				<BrowserRouter>
					<Routes>
						<Route
							path={CONSTANTS.ROUTES.INITIAL}
							element={<RestrictedRoute element={ShurlPage}/>}
							errorElement={<ErrorPage/>}
						/>
						<Route
							path={CONSTANTS.ROUTES.LOGIN}
							element={<LoginPage/>}
							errorElement={<ErrorPage/>}
						/>
						<Route
							path={CONSTANTS.ROUTES.ERROR}
							element={<ErrorRoutePage/>}
						/>
						<Route
							path={CONSTANTS.ROUTES.WILDCARD}
							element={<Navigate to={CONSTANTS.ROUTES.ERROR}/>}
						/>
					</Routes>
				</BrowserRouter>
				<Messages
					{...messages}
				/>
			</div>
		</div>
	)
}

export default App
