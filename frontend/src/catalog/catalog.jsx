import { useState, useEffect } from "react";
import "./catalog.css";
import { Link } from "react-router-dom";


function Catalog() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const API_URL = 'http://localhost:8000/products/api';

        async function fetchProducts() {
            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Data:", data.products);
                setProducts(data.products || []);
            } catch (e) {
                setError("Error");
                console.error("Помилка:", e);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProducts();
    }, []);

    if (isLoading) {
        return <div className="text-center mt-8 text-xl font-semibold">Downloading...</div>;
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
                                <Link className="catalog__item__link" to={`/product/${product.id}`}>
                                    <img
                                        src={`http://localhost:8000${product.photo_url}`}
                                        alt={product.title}
                                    />
                                    <div className="catalog__item__div">
                                        <h3 className="catalog__item__title">{product.title}</h3>
                                        <p className="catalog__item__text"></p>
                                        <p className="catalog__item__text-price">{product.price}$</p>
                                    </div>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    );
};



export default Catalog;