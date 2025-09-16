import Header from "./header/header"
import Catalog from "./catalog/catalog"
import Registration from "./registration/registration";

import Registration from "./registration/registration";
import Login from "./login/login";


function App() {
    return (
        <>
            <Header />
<<<<<<< Updated upstream
            <Catalog />
            {/* <Registration />
            <Login /> */}
=======
            <Header setActivLoginForm={setActivLoginForm} />

            <main>
                {activLoginForm && <Registration setActivLoginForm={setActivLoginForm} />}

                <Catalog />
            {/* <Registration /> */}
            {/* <Login/> */}
            </main>



>>>>>>> Stashed changes
        </>
    );
}

