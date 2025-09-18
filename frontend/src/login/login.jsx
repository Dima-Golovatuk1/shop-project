import { useRef } from "react";
import '../login/login.css';

function Login({ setActivRegistrationForm, setActivLoginForm }) {
    const formLoginRef = useRef(null);

    function closeForm() {
        setActivLoginForm(false);
    }


    function openRegistrationForm(){
        setActivLoginForm(false);
        setActivRegistrationForm(true);
    }

    function submitLogin(e) {
        e.preventDefault();
        const formData = new FormData(formLoginRef.current);
        const formDataObject = Object.fromEntries(formData.entries());

        console.log(formDataObject);

        fetch("http://localhost:8000/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDataObject)
        })
            .then(res => res.json())
            .then(data => {
                console.log("Server Response:", data);
            })
            .catch(err => console.error("Error:", err));
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
                <h2 className="login__title">Вхід</h2>
                <form className="login__form" ref={formLoginRef} onSubmit={submitLogin}>
                    <label className="login__label">
                        Пошта
                        <input className="login__input" name="email" type="email" placeholder="Пошта" />
                    </label>
                    <label className="login__label">
                        Номер телефону
                        <input className="login__input" name="phone" type="tel" placeholder="Номер телефону" />
                    </label>
                    <label className="login__label">
                        Пароль
                        <input className="login__input" name="password" type="password" placeholder="Пароль" />
                    </label>
                    <p onClick={openRegistrationForm} className="login__form__text">Не зареєстрований користувач?</p>
                    <button className="login__form__btn" type="submit">Увійти</button>
                </form>
            </div>
        </>
    );
}

export default Login;
