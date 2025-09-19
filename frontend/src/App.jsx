import { useState, useEffect } from "react";
import Header from "./header/header"
import Catalog from "./catalog/catalog"
import Registration from "./registration/registration";
import Login from "./login/login";
import Product from "./product/product";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
    useEffect(() => {
        fetch("http://localhost:8000/user/api/check-auth/", {
            method: "GET",
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                if (data.authenticated) {
                    console.log("Користувач увійшов:", data.username);
                } else {
                    console.log("Гість");
                }
            })
            .catch(err => console.error("Error:", err));
    }, []);


    const [activRegistrationForm, setActivRegistrationForm] = useState(false);
    const [activLoginForm, setActivLoginForm] = useState(false);

    return (
        <BrowserRouter>
            <Header setActivLoginForm={setActivRegistrationForm} />
            <main>
                {activRegistrationForm && <Registration setActivRegistrationForm={setActivRegistrationForm} setActivLoginForm={setActivLoginForm} />}
                {activLoginForm && <Login setActivLoginForm={setActivLoginForm} setActivRegistrationForm={setActivRegistrationForm} />}

                <Routes>
                    <Route path="/" element={<Catalog />} />

                    <Route path="/product/:id" element={<Product />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;



