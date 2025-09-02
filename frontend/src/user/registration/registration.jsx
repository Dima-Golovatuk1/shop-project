import { useRef } from "react";

function Registration() {
    const formRegistrRef = useRef(null);

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
                console.log("✅ Відповідь від сервера:", data);
            })
            .catch(err => console.error("❌ Помилка:", err));
    }

    return (
        <section className="registration">
            <div className="container">
                <form ref={formRegistrRef} onSubmit={submitRegistr}>
                    <label>
                        Ім'я
                        <input name="name" type="text" placeholder="Ім'я" />
                    </label>
                    <label>
                        Прізвище
                        <input name="lastName" type="text" placeholder="Прізвище" />
                    </label>
                    <label>
                        Пошта
                        <input name="email" type="text" placeholder="Пошта" />
                    </label>
                    <label>
                        Пароль
                        <input name="password" type="password" placeholder="Пароль" />
                    </label>
                    <button type="submit">Зареєструватися</button>
                </form>
            </div>
        </section>
    );
}

export default Registration;
