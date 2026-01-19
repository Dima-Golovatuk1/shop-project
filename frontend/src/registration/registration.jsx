import { useRef, useState } from "react";
import "./registration.css";

function Registration({ setActivRegistrationForm, setActivLoginForm }) {
    const formRegistrRef = useRef(null);

    function closeForm() {
        setActivRegistrationForm(false)
    }

    function openLoginForm() {
        setActivLoginForm(true)
        setActivRegistrationForm(false)
    }

    function submitRegistr(e) {
        e.preventDefault();
        const formData = new FormData(formRegistrRef.current);
        const formDataObject = Object.fromEntries(formData);

        fetch("http://localhost:8000/user/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDataObject)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(errData => {
                        throw new Error(errData.error || `HTTP error! status: ${res.status}`);
                    });
                }
                return res.json();
            })
            .then(data => {
                console.log("Registration successful:", data);
                setActivLoginForm(true);
                setActivRegistrationForm(false);
            })
            .catch(err => {
                console.error("Registration failed:", err.message);
            });
    }


    return (
        <>
        <br></br>
            <div className="backdrop-registration"></div>
            <div className="registration">
                <button onClick={closeForm} className="registration__close-btn">
                    <svg className="aside__btn-close__icon">
                        <use href="../../public/img/svg/symbol-defs.svg#icon-close"></use>
                    </svg>
                </button>
                <h2 className="registration__title">Sign up</h2>
                <form className="registration__form" ref={formRegistrRef} onSubmit={submitRegistr}>
                    <label className="registration__label">
                        Username
                        <input className="registration__input" name="username" type="text" placeholder="Username" autoComplete="given-name" />
                    </label>
                    <label className="registration__label">
                        Email
                        <input className="registration__input" name="email" type="email" placeholder="Email" autoComplete="email" />
                    </label>
                    <label className="registration__label">
                        Phone number
                        <input className="registration__input" name="phone_number" type="tel" placeholder="Phone number" autoComplete="tel" />
                    </label>
                    <label className="registration__label">
                        Password
                        <input className="registration__input" name="password" type="password" placeholder="Password" autoComplete="current-password" />
                    </label>
                    <label className="registration__label">
                        Repeat Password
                        <input className="registration__input" name="password2" type="password" placeholder="Repeat password" autoComplete="current-password" />
                    </label>
                    <button className="registration__form__btn" type="submit">Register</button>
                    <p onClick={openLoginForm} className="registration__form__text">Already have an account?</p>
                </form>
            </div>
        </>
    );
}

export default Registration;