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
                <section className="registration__content">
                                        
                    <div className="container">
                        <h2>Register</h2>
                        <br></br>
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

                    <a href="/user/login"><p>  
                        Already have an account?
                    </p></a>


                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Registration;
