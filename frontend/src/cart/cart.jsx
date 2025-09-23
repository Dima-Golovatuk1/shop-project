import { useState, useEffect } from "react";
// import "./catalog.css";

function Cart({ setActivCart }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    function closeForm() {
        setActivCart(false);
    }


    useEffect(() => {
        const API_URL = 'http://localhost:8000/cart/';

        async function fetchProducts() {
            try {
                const response = await fetch(API_URL, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Data:", data);
                console.log("Data:", data.products);
                setProducts(data.products || []);
            } catch (e) {
                setError("Error");
                console.error("Error:", e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProducts();
    }, [])

    const totalPrice = products.reduce((total, product) => {
        const price = parseFloat(product.product_price) || 0;
        const quantity = parseInt(product.quantity) || 0;
        return total + (price * quantity);
    }, 0);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return(
    <>
        <div className="backdrop-cart"></div>
        <section className="cart">
            <button onClick={closeForm} className="cart__close-btn">
                <svg className="cart__btn-close__icon">
                    <use href="../../public/img/svg/symbol-defs.svg#icon-close"></use>
                </svg>
            </button>
            <div className="container">
                <h2 className="cart__title">Cart</h2>
                <ul>
                    {products.length > 0 ? (
                        products.map(product => (
                            <li key={product.id}>
                                <img src={product.product_photo_url} alt={product.product_title} />
                                <div>
                                    <h3>{product.product_title}</h3>
                                    <p>{product.product_price}</p>
                                </div>
                                <div>
                                    <button>-</button>
                                    <p>{product.quantity}</p>
                                    <button>+</button>
                                </div>
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
