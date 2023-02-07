import './App.css';
import LogoTitle from './components/logoTitle/LogoTitle';
import {Outlet} from 'react-router-dom';
import { useAtomValue } from "jotai";
import spinnerAtom from "./store/spinnerStore.js";
import Spinner from "./components/spinner/Spinner.jsx";
import Messages from "./components/messages/Messages.jsx";
import messagesAtom from "./store/messagesStore.js";
import ProfileButton from "./components/button/profileButton/ProfileButton.jsx";

function App() {
	const spinner = useAtomValue(spinnerAtom);
	const messages = useAtomValue(messagesAtom);

	return (
		<div className="App">
			<div className="d-flex justify-end">
				<ProfileButton/>
			</div>
			<LogoTitle />
			<div className="position-relative">
				<Spinner show={spinner}/>
				<Messages
					{...messages}
				/>
				<Outlet/>
			</div>
		</div>
	);
}

export default App
