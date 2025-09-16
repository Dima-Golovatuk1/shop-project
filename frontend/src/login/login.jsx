import { useRef } from "react";
import '../login/login.css'

function Login() {
    const formLoginRef = useRef(null);

    function submitLogin(e) {
        e.preventDefault();
        const formData = new FormData(formLoginRef.current);
        const formDataObject = Object.fromEntries(formData);
        const formDataObjectt = Object.fromEntries(formData.entries());

        console.log(formDataObjectt);

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
<section className="registration">
    <div className="container">
        <form ref={formLoginRef} onSubmit={submitLogin} className="login-form">
            <div className="form-header">
                <h2 className="form-title">Welcome Back</h2>
                <p className="form-subtitle">Please sign in to your account</p>
            </div>
            
            <div className="form-fields">
                <label className="field-label">
                    <span className="label-text">Name</span>
                    <input 
                        name="name" 
                        type="text" 
                        placeholder="Enter your name" 
                        className="field-input"
                    />
                </label>

                <br></br>
                
                <label className="field-label">
                    <span className="label-text">Surname</span>
                    <input 
                        name="lastName" 
                        type="text" 
                        placeholder="Enter your surname" 
                        className="field-input"
                    />
                </label>
                <br></br>
                <label className="field-label">
                    <span className="label-text">Email</span>
                    <input 
                        name="email" 
                        type="email" 
                        placeholder="Enter your email" 
                        className="field-input"
                    />
                </label>
                <br></br>
                <label className="field-label">
                    <span className="label-text">Password</span>
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="Enter your password" 
                        className="field-input"
                    />
                </label>
            </div>
            <button type="submit" className="submit-button">
                Login
            </button>

            <p><a href="/user/register">Don't have an account?</a></p>
        </form>
    </div>
</section>
    );
}

export default Login;
