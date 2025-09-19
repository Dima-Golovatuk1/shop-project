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
        const formDataObjectt = Object.fromEntries(formData.entries());

        console.log(formDataObjectt);

        fetch("http://localhost:8000/user/register/", {
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
                        Name
                        <input className="registration__input" name="name" type="text" placeholder="Name" autoComplete="given-name" />
                    </label>
                    <label className="registration__label">
                        Surname
                        <input className="registration__input" name="lastName" type="text" placeholder="Surname" autoComplete="family-name" />
                    </label>
                    <label className="registration__label">
                        Email
                        <input className="registration__input" name="email" type="email" placeholder="Email" autoComplete="email" />
                    </label>
                    <label className="registration__label">
                        Phone number
                        <input className="registration__input" name="phone" type="tel" placeholder="Phone number" autoComplete="tel" />
                    </label>
                    <label className="registration__label">
                        Password
                        <input className="registration__input" name="password" type="password" placeholder="Password" autoComplete="current-password" />
                    </label>

                    <button className="registration__form__btn" type="submit">Register</button>
                    <p onClick={openLoginForm} className="registration__form__text">Already have an account?</p>
                </form>
            </div>
        </>
    );
}

export default Registration;