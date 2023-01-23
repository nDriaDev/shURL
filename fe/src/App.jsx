import './App.css';
import LogoTitle from './components/logoTitle/LogoTitle';
import ErrorPage from './routes/errorPage/ErrorPage';
import {
	RouterProvider,
	redirect,
	createRoutesFromElements,
	createBrowserRouter,
	Route,
	Navigate
} from 'react-router-dom';
import ShurlPage from './routes/shurlPage/ShurlPage';
import LoginPage from './routes/loginPage/LoginPage';
import Spinner from "./components/spinner/Spinner.jsx";
import store from "./store.js";
import RestrictedRoute from "./components/auth/RestrictedRoute.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route
				path="/"
				// loader={() => {}}
				element={<RestrictedRoute element={ShurlPage}/>}
				errorElement={<ErrorPage/>}
			/>
			<Route
				path="/login"
				element={<LoginPage/>}
				errorElement={<ErrorPage/>}
			/>
		</>
	)
);

function App() {
	return (
		<div className="App">
			<LogoTitle />
			<RouterProvider router={router}/>
		</div>
	)
}

export default App
