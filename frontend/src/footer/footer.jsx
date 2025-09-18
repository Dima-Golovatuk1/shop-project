import { useState } from "react";
import "../footer/footer.css";

function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <>
<footer class="footer">
    <div class="container">
        <div class="footer-logo">
            <span class="logo-text">Rozetka 2.0</span>
        </div>

        <nav class="footer-nav">
            <a href="#" class="nav-link">I'm lazy</a>
            <a href="#" class="nav-link">I'm lazy</a>
            <a href="#" class="nav-link">I'm lazy</a>
            <a href="#" class="nav-link">I'm lazy</a>
        </nav>


        <p class="copyright">© 2025 Rozetka 2.0. All rights deserved.</p>
    </div>
</footer>
    </>
  );
}

export default Footer;