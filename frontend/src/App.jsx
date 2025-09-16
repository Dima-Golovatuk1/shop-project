import { useState } from "react";
import Header from "./header/header";
import Catalog from "./catalog/catalog";
import Registration from "./registration/registration";
import Login from "./login/login";

function App() {
    const [activLoginForm, setActivLoginForm] = useState(null);

    return (
        <>
            <Header setActivLoginForm={setActivLoginForm} />

            <main>
                {activLoginForm === "register" && (
                    <Registration setActivLoginForm={setActivLoginForm} />
                )}
                {activLoginForm === "login" && (
                    <Login setActivLoginForm={setActivLoginForm} />
                )}

                <Catalog />
            </main>
        </>
    );
}

export default App;
