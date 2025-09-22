import { useState, useEffect } from "react";
import "./cart.css";

function Cart({ setActivCart, activCart }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    function closeForm(){
        setActivCart(false)
    }

    useEffect(() => {
        const API_URL = 'http://localhost:8000/cart/';

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
    }, [])

    const totalPrice = products.reduce((total, product) => {
        const price = parseFloat(product.price) || 0;
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
            <div
                className={`backdrop-cart ${activCart ? "" : "is-hidden"}`}
            ></div>
            <section className="cart">
                <button onClick={closeForm} className="cart__close-btn">
                    <svg className="cart__btn-close__icon">
                        <use href="../../public/img/svg/symbol-defs.svg#icon-close"></use>
                    </svg>
                </button>
                <div className="container">
                    <h2 className="cart__title">Кошик</h2>
                    <ul className="cart__list">
                        {products.length > 0 ? (
                            products.map(product => (
                                <li className="cart__item" key={product.id}>
                                    <img className="cart__item__img" src="" alt="" />
                                    <div className="cart__item__div">
                                        <h3 className="cart__item__div__title">Мобільний телефон Samsung Galaxy A16 8/256GB Light Green (SM-A165FLGCEUC)</h3>
                                        <p className="cart__item__div__text-price">{product.price}</p>
                                    </div>
                                    <div className="cart__item__div">
                                        <button className="cart__item__div__btn-minus">-</button>
                                        <p className="cart__item__div__text-quantity">{product.quantity}</p>
                                        <button className="cart__item__div__btn-plus">+</button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li>
                                <p className="cart__item__text-notfound">Кошик порожній.</p>
                            </li>
                            
                        )}
                    </ul>
                    <p className="cart__text">До сплати{ totalPrice }</p>
                    <button className="cart__btn">Купити</button>
                </div>
            </section>
        </>
    );
}

export default Cart;
