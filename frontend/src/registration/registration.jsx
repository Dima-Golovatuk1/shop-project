import { useRef, useState } from "react";
import "./registration.css";

function Registration({ setActivLoginForm  }) {
    const formRegistrRef = useRef(null);

    function closeForm(){
        setActivLoginForm(false)
    }

    function submitRegistr(e) {
        e.preventDefault();
        const formData = new FormData(formRegistrRef.current);
        const formDataObject = Object.fromEntries(formData);
        const formDataObjectt = Object.fromEntries(formData.entries());

        console.log(formDataObjectt);

        fetch("http://localhost:8000/user/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDataObject)
        })
            .then(res => res.json())
            .then(data => {
                console.log("Відповідь від сервера:", data);
            })
            .catch(err => console.error("Помилка:", err));
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
                <h2 className="registration__title">Реєстрація</h2>
                <form className="registration__form" ref={formRegistrRef} onSubmit={submitRegistr}>
                    <label className="registration__label">
                        Ім'я
                        <input className="registration__input" name="name" type="text" placeholder="Ім'я" />
                    </label>
                    <label className="registration__label">
                        Прізвище
                        <input className="registration__input" name="lastName" type="text" placeholder="Прізвище" />
                    </label>
                    <label className="registration__label">
                        Пошта
                        <input className="registration__input" name="email" type="text" placeholder="Пошта" />
                    </label>
                    <label className="registration__label">
                        Пароль
                        <input className="registration__input" name="password" type="password" placeholder="Пароль" />
                    </label>
                    <button className="registration__form__btn" type="submit">Зареєструватися</button>
                </form>
            </div>
        </>
    );
}

export default Registration;
