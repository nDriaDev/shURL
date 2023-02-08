import {memo} from "react";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import CONSTANTS from "../utils/constants.js";
import App from "../App.jsx";
import LandingPage from "./routes/landingPage/LandingPage.jsx";
import ErrorPage from "./routes/errorPage/ErrorPage.jsx";
import ShurlPage from "./routes/shurlPage/ShurlPage.jsx";
import ErrorRoutePage from "./routes/errorPage/ErrorRoutePage.jsx";
import Spinner from "../components/spinner/Spinner.jsx";
import signInPageLoader from "./routes/signInPage/signInPageLoader.js";
import SignInPage from "./routes/signInPage/SignInPage.jsx";
import SignUpPage from "./routes/signUpPage/SignUpPage.jsx";
import signUpPageLoader from "./routes/signUpPage/signUpPageLoader.js";
import ForgotPasswordPage from "./routes/forgotPasswordPage/ForgotPasswordPage.jsx";
import ActivateUserPage from "./routes/activeUserPage/ActivateUserPage.jsx";
import activateUserPageLoader from "./routes/activeUserPage/activateUserPageLoader.js";
import ResetPasswordPage from "./routes/resetPasswordPage/ResetPasswordPage.jsx";

const Router = ({}) => {
	const router = createBrowserRouter([
		{
			path: CONSTANTS.ROUTES.INITIAL,
			element: <App/>,
			children: [
				{
					index: true,
					element: <LandingPage/>,
					errorElement: <ErrorPage/>
				},
				{
					path: CONSTANTS.ROUTES.ACTIVATE_USER,
					caseSensitive: true,
					element: <ActivateUserPage/>,
					errorElement: <ErrorPage/>,
					loader: activateUserPageLoader
				},
				{
					path: CONSTANTS.ROUTES.GENERATE,
					caseSensitive: true,
					element: <ShurlPage/>,
					errorElement: <ErrorPage/>,
				},
				{
					path: CONSTANTS.ROUTES.SIGNIN,
					caseSensitive: true,
					element: <SignInPage/>,
					errorElement: <ErrorPage/>,
					loader: signInPageLoader,
				},
				{
					path: CONSTANTS.ROUTES.SIGNUP,
					caseSensitive: true,
					element: <SignUpPage/>,
					errorElement: <ErrorPage/>,
					loader: signUpPageLoader,
				},
				{
					path: CONSTANTS.ROUTES.FRG_PWD,
					caseSensitive: true,
					element: <ForgotPasswordPage/>,
					errorElement: <ErrorPage/>,
				},
				{
					path: CONSTANTS.ROUTES.RESET_PWD,
					caseSensitive: true,
					element: <ResetPasswordPage/>,
					errorElement: <ErrorPage/>,
					loader: activateUserPageLoader
				},
				{
					caseSensitive: true,
					path: CONSTANTS.ROUTES.ERROR,
					element: <ErrorRoutePage/>,
				},
				{
					path: CONSTANTS.ROUTES.WILDCARD,
					element: <Navigate to={CONSTANTS.ROUTES.ERROR}/>,
				}
			]
		}
	]);

	return(
		<RouterProvider
			router={router}
			fallbackElement={<Spinner show={true} useContainer={true}/>}
		/>
	)
}

Router.displayName = "Router";

export default memo(Router);