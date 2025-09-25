import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Order.css";

function Order() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        address: "",
        phone: "",
        payment_method: "card",
    });

    const [cartItems, setCartItems] = useState([]);
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

    useEffect(() => {
        async function fetchCartItems() {
            try {
                const response = await fetch("http://localhost:8000/cart/", {
                    method: "GET",
                    credentials: "include",
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch cart data");
                }
                const data = await response.json();
                setCartItems(data.products || []);
            } catch (e) {
                setError("Error loading cart");
            } finally {
                setIsLoading(false);
            }
        }
        fetchCartItems();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            setError("Кошик порожній. Додайте товари для замовлення.");
            return;
        }

        const orderData = {
            ...formData,
            items: cartItems.map(item => ({
                product_id: item.product_id, // Змінено на product_id
                quantity: item.quantity,
            })),
        };

        try {
            const response = await fetch("http://localhost:8000/orders/create/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                },
                body: JSON.stringify(orderData),
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Order creation failed.");
            }

            const result = await response.json();
            console.log("Order created successfully:", result);
            alert("Замовлення успішно оформлено!");
            navigate("/");
        } catch (e) {
            console.error("Error creating order:", e);
            setError(e.message || "Failed to create order.");
        }
    };

    // Обчислення загальної суми
    const totalAmount = cartItems.reduce((total, item) => {
        // Звертаємося до product_price
        return total + (item.product_price * item.quantity);
    }, 0);

    if (isLoading) {
        return <div className="order-loading">Завантаження кошика...</div>;
    }

    if (error) {
        return <div className="order-error">Помилка: {error}</div>;
    }

    return (
        <div className="order-container">
            <h2 className="order-title">Оформлення замовлення</h2>
            
            <div className="order-main">
                <div className="order-form-block">
                    <form onSubmit={handleSubmit} className="order-form">
                        <div className="form-group">
                            <label>Ім'я:</label>
                            <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Прізвище:</label>
                            <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Адреса:</label>
                            <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Телефон:</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Спосіб оплати:</label>
                            <select name="payment_method" value={formData.payment_method} onChange={handleInputChange}>
                                <option value="card">Оплата карткою</option>
                                <option value="cash">Готівкою при отриманні</option>
                            </select>
                        </div>
                    </form>
                </div>

                <div className="order-summary-block">
                    <h3>Ваше замовлення:</h3>
                    <ul className="order-items-list">
                        {cartItems.map(item => (
                            <li key={item.id} className="order-item">
                                <img 
                                    src={`http://localhost:8000${item.product_photo_url}`} // Змінено
                                    alt={item.product_title} // Змінено
                                    className="order-item-img" 
                                />
                                <div className="order-item-details">
                                    <span className="order-item-title">{item.product_title}</span> {/* Змінено */}
                                    <span className="order-item-quantity">{item.quantity} шт.</span>
                                    <span className="order-item-price">{(item.product_price * item.quantity).toFixed(2)}$</span> {/* Змінено */}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="order-total-price">
                        <span>Загальна сума:</span>
                        <span>{totalAmount.toFixed(2)}$</span>
                    </div>
                    <button type="submit" onClick={handleSubmit} className="order-submit-btn">Підтвердити замовлення</button>
                </div>
            </div>
        </div>
    );
}

export default Order;