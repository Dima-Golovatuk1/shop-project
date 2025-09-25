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
              <span className="logo-text">ClickShop</span>
            </div>
            <p className="contact-text">Our internet-shop suggests many products.</p>
            <ul className="social-links">
              <li><a href="#"><FaInstagram /></a></li>
              <li><a href="#"><FaTelegram /></a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Info</h4>
            <nav className="footer-nav">
              <ul>
                <li><a href="#" className="nav-link">About us</a></li>
                <li><a href="#" className="nav-link">Privacy Policy</a></li>
              </ul>
            </nav>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">For clients</h4>
            <nav className="footer-nav">
              <ul>
                <li><a href="#" className="nav-link">FAQ</a></li>
                <li><a href="#" className="nav-link">Rewievs</a></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2025 ClickShop. All rights deserved</p>
          <p className="developer-info">Made in <a href="#">React</a> & <a href="#">Django</a></p>
        </div>
      </div>  
    </footer>
  );
}

export default Footer;