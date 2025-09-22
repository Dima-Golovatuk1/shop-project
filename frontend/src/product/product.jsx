import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import "./product.css";


function Product() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    function submitAddCart(e) {
        const data = {
            "product_id": id 
        };
        
        fetch(`http://localhost:8000/cart/api/add/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log("Server Response:", data);
        })
        .catch(err => console.error("Error:", err));
    }


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
                setProduct(data.products);
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
                <div className="product__card">
                    <img
                        className="product__img"
                        src={`http://localhost:8000${product.photo_url}`}
                        alt={product.title}
                    />
                    <div className="product__div">
                        <h2 className="product__title">{product.title}</h2>
                        <p className="product__text-description">{product.description}</p>
                        <div className="product__div-buy">
                            <p className="product__text-price">{product.price}</p>
                            <button onClick={submitAddCart} className="product__btn">Купити</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};



export default Product;