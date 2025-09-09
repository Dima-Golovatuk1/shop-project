import { useState, useEffect } from "react";
import "./catalog.css";


function Catalog() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const API_URL = 'https://jsonplaceholder.typicode.com/users';

        async function fetchProducts() {
            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Отримані дані:", data);
                setProducts(data);
            } catch (e) {
                setError("Не вдалося завантажити.");
                console.error("Помилка:", e);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProducts();
    }, []);

    if (isLoading) {
        return <div className="text-center mt-8 text-xl font-semibold">Завантаження...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500 font-semibold">{error}</div>;
    }



    return (
        <section className="catalog">
            <div className="container">
                <ul className="catalog__list">
                    {
                        products.map(product => (
                            <li key={product.id} className="catalog__item">
                                <a className="catalog__item__link" href="">
                                    <img src="" alt="" />
                                    <div className="catalog__item__div">
                                        <h3 className="catalog__item__title">{product.email}</h3>
                                        <p className="catalog__item__text"></p>
                                        <p className="catalog__item__text-price"></p>
                                    </div>
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    );
};



export default Catalog;