import { useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom";
import "./cart.css";

function Cart({ setActivCart, activCart }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const csrfToken = getCookie("csrftoken");

    function closeForm() {
        setActivCart(false);
    }


    function addQuantity(productId) {
        const data = {
            "item_id": productId
        };
        const csrfToken = getCookie("csrftoken");
        fetch("http://localhost:8000/cart/api/update_add/", {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Server responded with status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log("Server Response (addQuantity):", data);
                setProducts(data.items);
            })
            .catch(err => {
                console.error("Error in addQuantity:", err);
            });
    }

    function removQuantity(productId) {
        const data = {
            "item_id": productId
        };
        const csrfToken = getCookie("csrftoken");
        fetch("http://localhost:8000/cart/api/update_remove/", {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Server responded with status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log("Server Response (removQuantity):", data);
                setProducts(data.items);
            })
            .catch(err => {
                console.error("Error in removQuantity:", err);
            });
    }

    function deleteProduct(productId){
        const data = {
            "item_id": productId
        };
        const csrfToken = getCookie("csrftoken");
        fetch("http://localhost:8000/cart/api/remove/", {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Server responded with status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log("Server Response (deleteProduct):", data);
                setProducts(data.items);
            })
            .catch(err => {
                console.error("Error in deleteProduct:", err);
            });
    }

    function onBuy(){
        navigate('/order');
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
                setProducts(data.products || []);
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
            <div
                className={`backdrop-cart ${activCart ? "" : "is-hidden"}`}
                onClick={closeForm}
            ></div>
            <section className={`cart ${activCart ? "" : "is-hidden"}`}>
                <button onClick={closeForm} className="cart__close-btn">
                    <svg className="cart__btn-close__icon">
                        <use href="../../public/img/svg/symbol-defs.svg#icon-close"></use>
                    </svg>
                </button>
                <h2 className="cart__title">Cart</h2>
                <ul className="cart__list">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <li className="cart__item" key={product.product_id}>
                                <img
                                    className="cart__item__img"
                                    src={`http://localhost:8000${product.product_photo_url}`}
                                />
                                <div className="cart__item__div cart__item__div-text">
                                    <h3 className="cart__item__div__title">
                                        Title: {product.product_title}
                                    </h3>
                                    <p className="cart__item__div__text">
                                        Price: {product.product_price}$
                                    </p>
                                </div>
                                <div className="cart__item__div cart__item__div-quantity">
                                    <button
                                        
                                        onClick={() => removQuantity(product.product_id)}
                                        className="cart__item__div__btn-add"
                                    >
                                        -
                                    </button>
                                    <h4 className="cart__item__div__title-quantity">
                                        Quantity: {product.quantity}
                                    </h4>
                                    <button
                                        
                                        onClick={() => addQuantity(product.product_id)}
                                        className="cart__item__div__btn-remov"
                                    >
                                        +
                                    </button>
                                    <button
                                        
                                        onClick={() => deleteProduct(product.product_id)}
                                        className="cart__item__div__title-quantity"
                                    >
                                        delete
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>
                            <p className="cart__item__text-empty">Cart is empty.</p>
                        </li>
                    )}
                </ul>
                <p className="cart__text">Total price: {totalPrice}$</p>
                <button onClick={onBuy} className="cart__btn">Buy</button>
            </section>
        </>
    );
}

export default Cart;
