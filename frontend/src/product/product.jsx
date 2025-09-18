import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import "./product.css";


function Product() {
    const { id } = useParams();

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const API_URL = `http://localhost:8000/products/${id}/`;

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
        <section className="product">
            <div className="container">
                    <img className="product_img" src="" alt="" />
                    <div className="product__div">
                        <h2 className="product__title"></h2>
                        <p className="product__text-description"></p>
                        <p className="product__text-price"></p>
                        <button className="product__btn">Купити</button>
                    </div>
            </div>
        </section>
    );
};



export default Product;