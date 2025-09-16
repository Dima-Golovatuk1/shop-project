import { useRef } from "react";
import "./registration.css";

function Registration({ setActivLoginForm }) {
    const formRegistrRef = useRef(null);

    function closeForm() {
        setActivLoginForm(false);
    }

    function submitRegistr(e) {
        e.preventDefault();
        const formData = new FormData(formRegistrRef.current);
        console.log(Object.fromEntries(formData));
    }

    return (
        <div className="backdrop-registration" onClick={closeForm}>
            <div className="registration" onClick={(e) => e.stopPropagation()}>
                <button onClick={closeForm} className="registration__close-btn">
                    <svg className="aside__btn-close__icon">
                        <use href="/img/svg/symbol-defs.svg#icon-close"></use>
                    </svg>
                </button>
                <section className="registration__content">
                    <div className="container">
                        <form ref={formRegistrRef} onSubmit={submitRegistr}>
                            <label>
                                Name
                                <input name="name" type="text" placeholder="name" />
                            </label>
                            <label>
                                Surname
                                <input name="lastName" type="text" placeholder="surname" />
                            </label>
                            <label>
                                Email
                                <input name="email" type="text" placeholder="email" />
                            </label>
                            <label>
                                Password
                                <input name="password" type="password" placeholder="password" />
                            </label>
                            <label>
                                Repeat password
                                <input name="password2" type="password" placeholder="repeat password" />
                            </label>
                            <button type="submit">Register</button>

                            <p>
                                <a href="/user/login">Already have an account?</a>
                            </p>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Registration;
