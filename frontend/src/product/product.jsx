import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./product.css";

function Product() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isInCart, setIsInCart] = useState(false);

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

    function submitAddCart(e) {
        e.preventDefault();
        const data = {
            product_id: id,
        };

        fetch(`http://localhost:8000/cart/api/add/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify(data),
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(() => {
                console.log("Product added to cart successfully.");
                setIsInCart(true);
            })
            .catch((err) => {
                console.error("Error adding product to cart:", err);
                setError("Error adding product to cart.");
            });
    }

    useEffect(() => {
        const fetchAllData = async () => {
            setIsLoading(true);
            try {
                const [productResponse, cartResponse] = await Promise.all([
                    fetch(`http://localhost:8000/products/${id}/`),
                    fetch("http://localhost:8000/cart/", {
                        method: "GET",
                        credentials: "include",
                    }),
                ]);

                if (!productResponse.ok || !cartResponse.ok) {
                    throw new Error("Failed to fetch data.");
                }

                const productData = await productResponse.json();
                const cartData = await cartResponse.json();

                setProduct(productData.products);

                const productInCart = (cartData.products || []).some(
                    (item) => parseInt(item.id) === parseInt(id)
                );
                setIsInCart(productInCart);

                setError(null);
            } catch (e) {
                console.error("Error during data fetching:", e);
                setError("An error occurred while loading data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, [id]);

    if (isLoading) {
        return (
            <div className="text-center mt-8 text-xl font-semibold">
                Завантаження...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-8 text-red-500 font-semibold">{error}</div>
        );
    }

    if (!product) {
        return (
            <div className="text-center mt-8 text-gray-500">
                Товар не знайдено.
            </div>
        );
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
                            <p className="product__text-price">{product.price}$</p>
                            {isInCart ? (
                                <div className="product__in-cart-text">
                                    В кошику
                                </div>
                            ) : (
                                <button onClick={submitAddCart} className="product__btn">
                                    Купити
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Product;