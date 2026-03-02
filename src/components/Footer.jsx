import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section footer-brand">
          <div className="brand-logo">
            <h2>📊 Quantivo ERP</h2>
          </div>
          <p className="brand-tagline">Manage Products, Customers & Sales Easily</p>
          <p className="brand-description">Enterprise Resource Planning system built for modern business management with real-time analytics and comprehensive reporting.</p>
          <div className="social-icons">
            <a href="https://www.instagram.com/quantivoerp" title="Instagram"><FaInstagram /></a>
            <a href="https://www.facebook.com/quantivoerp" title="Facebook"><FaFacebook /></a>
            <a href="https://www.linkedin.com/company/quantivoerp" title="LinkedIn"><FaLinkedin /></a>
            {/* <a href="#" title="GitHub"><FaGithub /></a> */}
          </div>
        </div>

        {/* Products Section */}
        <div className="footer-section">
          <h4>🛍️ Products</h4>
          <ul>
            <li><Link to="/products/electronics">Electronics</Link></li>
            <li><Link to="/products/clothing">Clothing</Link></li>
            <li><Link to="/products/food-items">Food Items</Link></li>
            <li><Link to="/products/bakery">Bakery</Link></li>
            <li><Link to="/products/grocery">Grocery</Link></li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h4>⚡ Quick Links</h4>
          <ul>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Customers</a></li>
            <li><a href="#">Sales Orders</a></li>
            <li><a href="#">Analytics</a></li>
          </ul>
        </div>

        {/* Company Section */}
        <div className="footer-section">
          <h4>ℹ️ Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/founder">Our Founder</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/security">Security</Link></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section footer-contact">
          <h4>📞 Contact Us</h4>
          <div className="contact-item">
            <FaMapMarkerAlt />
            <div>
              <p className="contact-label">Address</p>
              <p>HathiBarKala, Rajpur Road, Dehradun, Uttarakhand, India</p>
            </div>
          </div>
          <div className="contact-item">
            <FaPhone />
            <div>
              <p className="contact-label">Phone</p>
              <p>+91 7079308040</p>
            </div>
          </div>
          <div className="contact-item">
            <FaEnvelope />
            <div>
              <p className="contact-label">Email</p>
              <p><a href="mailto:info@quantivo.com">info@quantivo.com</a></p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-divider"></div>
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} Quantivo ERP. All Rights Reserved.</p>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms">Terms</Link>
            <span>•</span>
            <Link to="/security">Security</Link>
            <span>•</span>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
