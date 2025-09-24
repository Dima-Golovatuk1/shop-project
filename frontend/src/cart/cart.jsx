import { useState, useEffect } from "react";
import "./cart.css";

function Cart({ setActivCart, activCart  }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    function closeForm() {
        setActivCart(false);
    }

    useEffect(() => {
        const API_URL = "http://localhost:8000/cart/";

        async function fetchProducts() {
            try {
                const response = await fetch(API_URL, {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Data:", data);
                setProducts(data.items || []);
            } catch (e) {
                setError("Error");
                console.error("Error:", e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProducts();
    }, [activCart]);

    const totalPrice = products.reduce((total, product) => {
        const price = parseFloat(product.product_price) || 0;
        const quantity = parseInt(product.quantity) || 0;
        return total + price * quantity;
    }, 0);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <div className={`backdrop-cart ${activCart ? "" : "is-hidden"}`} onClick={closeForm}></div>
            <section className={`cart ${activCart ? "" : "is-hidden"}`}>
                <button onClick={closeForm} className="cart__close-btn">
                    <svg className="cart__btn-close__icon">
                        <use href="../../public/img/svg/symbol-defs.svg#icon-close"></use>
                    </svg>
                </button>
                <div className="container">
                    <h2 className="cart__title">Cart</h2>
                    <br></br>
                    <br></br>
                    <ul>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <li key={product.id}>
                                    <img src={`http://localhost:8000${product.photo_url}`} />
                                    <div>
                                        <h3>Title: {product.product_title}</h3>
                                        <p>Price: {product.product_price}</p>
                                    </div>
                                    <div>
                                        <button>-</button>
                                        <h4>Quantity: {product.quantity}</h4>
                                        <button>+</button>
                                    </div>
                                    <br></br>
                                </li>
                            ))
                        ) : (
                            <p>Cart is empty.</p>
                        )}
                    </ul>
                    <p>Total price: {totalPrice}</p>
                    <button>Buy</button>
                </div>
            </section>
        </>
    );
}

export default Cart;
