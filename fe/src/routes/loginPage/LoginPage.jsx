import {useRef, useState} from "react";
import { useCallback } from "react";
import { memo } from "react";
import Spinner from "../../components/spinner/Spinner.jsx";
import {useNavigate} from "react-router-dom";
import './LoginPage.css';
const LoginPage = ({ }) => {
    const navigate = useNavigate();
    const [spinner, setSpinner] = useState(false);
    const form = useRef({ email:'', password:'' });
    const onChange = useCallback(e => {
        form.current[e.target.name] = e.target.value;
    }, []);

    const login = useCallback(async e => {
        setSpinner(true);
        try {
            const response = await fetch('/signin', {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ ...form.current }),
            });
            const result = await response.json();
            localStorage.setItem('accessToken', result.accessToken);
            navigate('/');
        } catch (e) {
            throw e;
        } finally {
            setSpinner(false);
        }
    }, []);

    if(spinner) {
        return <Spinner show={true}/>
    }

    return (
        <div className="login-form">
            <input placeholder="Email" type="email" name="email" onChange={onChange}/>
            <input placeholder="Password" type="password" name="password" onChange={onChange} />
            <button type="button" onClick={login}>Accedi</button>
        </div>
    )
};

LoginPage.displayName = "LoginPage";

export default memo(LoginPage);