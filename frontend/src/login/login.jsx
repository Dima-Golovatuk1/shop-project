import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import '../login/login.css';

function Login({ setActivRegistrationForm, setActivLoginForm }) {
    const formLoginRef = useRef(null);
    const navigate = useNavigate();

    function closeForm() {
        setActivLoginForm(false);
    }


    function openRegistrationForm() {
        setActivLoginForm(false);
        setActivRegistrationForm(true);
    }

    function submitLogin(e) {
        e.preventDefault();
        const formData = new FormData(formLoginRef.current);
        const formDataObject = Object.fromEntries(formData);

        fetch("http://localhost:8000/user/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDataObject),
            credentials: "include"
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json(); 
            })
            .then(data => {
                console.log("Login successful:", data);
                window.location.reload();
            })
            .catch(err => {
                console.error("Login failed:", err);
            });
    }

    return (
        <>
            <div className="backdrop-login" onClick={closeForm}></div>
            <div className="login">
                <button onClick={closeForm} className="login__close-btn">
                    <svg className="aside__btn-close__icon">
                        <use href="../../public/img/svg/symbol-defs.svg#icon-close"></use>
                    </svg>
                </button>
                <h2 className="login__title">Sign in</h2>
                <form className="login__form" ref={formLoginRef} onSubmit={submitLogin}>
                    <label className="login__label">
                        Email
                        <input className="login__input" name="email" type="email" placeholder="Email" />
                    </label>
                    <label className="login__label">
                        Password
                        <input className="login__input" name="password" type="password" placeholder="Password" />
                    </label>
                    <button className="login__form__btn" type="submit">Login</button>
                    <p onClick={openRegistrationForm} className="login__form__text">Don't have an account?</p>
                </form>
            </div>
        </>
    );
}

export default Login;
