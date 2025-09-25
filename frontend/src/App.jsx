import { useState, useEffect } from "react";
import Header from "./header/header"
import Catalog from "./catalog/catalog"
import Registration from "./registration/registration";
import Login from "./login/login";
import Product from "./product/product";
import Cart from "./cart/cart";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserProfile from './profile/profile' 
import Search from "./search/search";
import Order from "./order/order";
import Footer from"./footer/footer";

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
                setActivCart={setActivCart}
            />
            <main>
                {activRegistrationForm && <Registration setActivRegistrationForm={setActivRegistrationForm} setActivLoginForm={setActivLoginForm} />}
                {activLoginForm && <Login setActivLoginForm={setActivLoginForm} setActivRegistrationForm={setActivRegistrationForm} />}
                {activCart && <Cart setActivCart={setActivCart} activCart={activCart} />}

                <Routes>
                    <Route path="/" element={<Catalog />} />

                    <Route path="/product/:id" element={<Product />} />

                    <Route path="/search" element={<Search />}/>

                    <Route path="/profile" element={<UserProfile />} />

                    <Route path="/order" element={<Order />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;



