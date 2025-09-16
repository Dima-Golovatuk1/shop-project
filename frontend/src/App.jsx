import Header from "./header/header"
import Catalog from "./catalog/catalog"
import Registration from "./registration/registration";

import Registration from "./registration/registration";
import Login from "./login/login";


function App() {
    return (
        <>
            <Header />



            <Header setActivLoginForm={setActivLoginForm} />

            <main>
                {activLoginForm && <Registration setActivLoginForm={setActivLoginForm} />}

                <Catalog />
            {/* <Registration /> */}
            {/* <Login/> */}
            </main>



        </>
    );
}