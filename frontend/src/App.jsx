import { useState } from "react";
import Header from "./header/header"
import Catalog from "./catalog/catalog"
import Registration from "./registration/registration";


function App() {
    const [activLoginForm, setActivLoginForm] = useState(false);

    return (
        <>
            <Header setActivLoginForm={setActivLoginForm} />

            <main>
                {activLoginForm && <Registration setActivLoginForm={setActivLoginForm} />}

                <Catalog />
            </main>

        </>
    );
}


export default App;