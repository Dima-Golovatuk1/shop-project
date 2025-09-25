import { useState } from "react";
import "./footer.css";
import { FaFacebook, FaInstagram, FaTelegram } from "react-icons/fa";

function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-section footer-contact">
            <div className="footer-logo">
              <span className="logo-text">Rozetka 2.0</span>
            </div>
            <p className="contact-text">Наш інтернет-магазин пропонує широкий асортимент товарів для кожного.</p>
            <ul className="social-links">
              <li><a href="#"><FaFacebook /></a></li>
              <li><a href="#"><FaInstagram /></a></li>
              <li><a href="#"><FaTelegram /></a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Інформація</h4>
            <nav className="footer-nav">
              <ul>
                <li><a href="#" className="nav-link">Про нас</a></li>
                <li><a href="#" className="nav-link">Доставка та оплата</a></li>
                <li><a href="#" className="nav-link">Політика конфіденційності</a></li>
                <li><a href="#" className="nav-link">Обмін і повернення</a></li>
              </ul>
            </nav>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Клієнтам</h4>
            <nav className="footer-nav">
              <ul>
                <li><a href="#" className="nav-link">Контакти</a></li>
                <li><a href="#" className="nav-link">FAQ</a></li>
                <li><a href="#" className="nav-link">Відгуки</a></li>
                <li><a href="#" className="nav-link">Бонусна програма</a></li>
              </ul>
            </nav>
          </div>

          <div className="footer-section footer-newsletter">
            <h4 className="footer-heading">Підписка на розсилку</h4>
            <p>Будьте в курсі всіх акцій та новинок!</p>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Підписатися</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2025 Rozetka 2.0. Всі права захищені.</p>
          <p className="developer-info">Розроблено на <a href="#">React</a> & <a href="#">Django</a></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;