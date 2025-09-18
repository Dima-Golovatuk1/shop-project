import { useState } from "react";
import Header from "./header/header"
import Catalog from "./catalog/catalog"
import Registration from "./registration/registration";
import Login from "./login/login";


function App() {
    const [activRegistrationForm, setActivRegistrationForm] = useState(false);
    const [activLoginForm, setActivLoginForm] = useState(false);

    return (
        <>
            <Header setActivLoginForm={setActivRegistrationForm} />

            <main>
                {activRegistrationForm && <Registration setActivRegistrationForm={setActivRegistrationForm} setActivLoginForm={setActivLoginForm} />}

                {activLoginForm && <Login setActivLoginForm={setActivLoginForm} setActivRegistrationForm={setActivRegistrationForm} />}

                <Catalog />
            </main>

        </>
    );
}


export default App;