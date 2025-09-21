import { useState, useEffect } from "react";
import Header from "./header/header"
import Catalog from "./catalog/catalog"
import Registration from "./registration/registration";
import Login from "./login/login";
import Product from "./product/product";
import Cart from "./cart/cart";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
    const [activRegistrationForm, setActivRegistrationForm] = useState(false);
    const [activLoginForm, setActivLoginForm] = useState(false);
    const [activCart, setActivCart] = useState(false)

    const [dataAuthenticated, setdataAuthenticated] = useState(false)
    const [username, setUsername] = useState(null);


    useEffect(() => {
        fetch("http://localhost:8000/user/api/check-auth/", {
            method: "GET",
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                if (data.authenticated) {
                    setdataAuthenticated(true)
                    setUsername(data.username)
                    console.log("username:", data.username);
                } else {
                    setdataAuthenticated(false);
                    setUsername(null);
                    console.log("Guest");
                }
            })
            .catch(err => console.error("Error:", err));
    }, []);


    return (
        <BrowserRouter>
            <Header
                dataAuthenticated={dataAuthenticated} 
                setActivLoginForm={setActivRegistrationForm} 
            />
            <main>
                {activRegistrationForm && <Registration setActivRegistrationForm={setActivRegistrationForm} setActivLoginForm={setActivLoginForm} />}
                {activLoginForm && <Login setActivLoginForm={setActivLoginForm} setActivRegistrationForm={setActivRegistrationForm} />}
                {activCart && <Cart setActivCart={setActivCart}/>}

                <Routes>
                    <Route path="/" element={<Catalog />} />

                    <Route path="/product/:id" element={<Product />} />

                    <Route path="/profile" element={<Catalog />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;



