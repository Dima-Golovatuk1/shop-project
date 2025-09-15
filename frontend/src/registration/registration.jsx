import { useRef } from "react";

function Registration() {
    const formRegistrRef = useRef(null);

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
        <section className="registration">
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

                    <p><a href="/user/login">Already have an account?</a></p>
                </form>
            </div>
        </section>
    );
}

export default Registration;
