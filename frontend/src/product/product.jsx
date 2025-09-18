import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import "./product.css";


function Product() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const API_URL = `http://localhost:8000/products/${id}/`;
    
        async function fetchProduct() {
            try {
                const response = await fetch(API_URL);
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json();
                console.log("Data:", data);
    
                setProduct(data.products[0]);
                setError(null);
            } catch (e) {
                setError("Помилка завантаження товару");
                console.error("Помилка:", e);
            } finally {
                setIsLoading(false);
            }
        }
    
        fetchProduct();
    }, [id]);
    

    if (isLoading) {
        return <div className="text-center mt-8 text-xl font-semibold">Downloading...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500 font-semibold">{error}</div>;
    }



    return (
        <section className="product">
            <div className="container">
                <img
                    src={`http://localhost:8000${product.photo_url}`}
                    alt={product.title}
                />
                <div className="product__div">
                    <h2 className="product__title">{product.title}</h2>
                    <p className="product__text-description">{product.description}</p>
                    <p className="product__text-price">{product.price}</p>
                    <button className="product__btn">Купити</button>
                </div>
            </div>
        </section>
    );
};



export default Product;