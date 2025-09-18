import { useState } from "react";
import Header from "./header/header"
import Catalog from "./catalog/catalog"
import Registration from "./registration/registration";
import Login from "./login/login";
import Product from "./product/product";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
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



