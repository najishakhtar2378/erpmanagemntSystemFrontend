import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="about-us-page">
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>🚀 About Quantivo ERP</h1>
          <p className="hero-subtitle">Transform Your Business with Modern ERP Solutions</p>
        </div>
      </div>

      <div className="about-container">
        {/* Our Story */}
        <section className="about-section">
          <h2>📖 Our Story</h2>
          <p>
            Quantivo ERP was founded with a mission to simplify business management for enterprises of all sizes. 
            We believe that powerful ERP tools should be accessible, intuitive, and designed for the modern business landscape.
          </p>
          <p>
            Since our inception, we've been committed to delivering cutting-edge solutions that help businesses 
            streamline their operations, improve customer relationships, and drive growth.
          </p>
        </section>

        {/* Our Mission */}
        <section className="about-section mission">
          <h2>🎯 Our Mission</h2>
          <div className="mission-content">
            <p>
              To empower businesses worldwide with intelligent, user-friendly ERP software that drives efficiency, 
              enhances decision-making, and accelerates growth.
            </p>
          </div>
        </section>

        {/* Our Values */}
        <section className="about-section">
          <h2>💎 Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>🔒 Security First</h3>
              <p>Your data security is our top priority. We implement industry-leading security measures to protect your business information.</p>
            </div>
            <div className="value-card">
              <h3>📈 Innovation</h3>
              <p>We continuously innovate and improve our platform to stay ahead of market trends and customer needs.</p>
            </div>
            <div className="value-card">
              <h3>🤝 Customer Success</h3>
              <p>Your success is our success. We're dedicated to providing exceptional support and solutions.</p>
            </div>
            <div className="value-card">
              <h3>🌍 Global Vision</h3>
              <p>We serve businesses globally while maintaining local expertise and understanding of diverse markets.</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="about-section">
          <h2>⭐ Why Choose Quantivo ERP?</h2>
          <ul className="features-list">
            <li>✅ <strong>Comprehensive Platform</strong> - All-in-one solution for inventory, sales, and analytics</li>
            <li>✅ <strong>Real-Time Analytics</strong> - Make data-driven decisions with advanced reporting</li>
            <li>✅ <strong>Role-Based Access Control</strong> - Secure access management with admin, manager, and staff roles</li>
            <li>✅ <strong>User-Friendly Interface</strong> - Intuitive design that requires minimal training</li>
            <li>✅ <strong>Scalable Infrastructure</strong> - Grows with your business needs</li>
            <li>✅ <strong>24/7 Support</strong> - Dedicated support team ready to help</li>
            <li>✅ <strong>Secure & Reliable</strong> - Enterprise-grade security with 99.9% uptime</li>
          </ul>
        </section>

        {/* Team Section */}
        <section className="about-section">
          <h2>👥 Our Team</h2>
          <p>
            Our team comprises experienced professionals from various backgrounds - software engineers, business analysts, 
            UX designers, and customer success specialists. Together, we're committed to delivering the best ERP experience.
          </p>
        </section>

        {/* Contact Section */}
        <section className="about-section contact-section">
          <h2>📞 Get In Touch</h2>
          <div className="contact-info">
            <div className="contact-item">
              <h3>📍 Office Location</h3>
              <p>HathiBarKala, Rajpur Road<br />Dehradun, Uttarakhand, India</p>
            </div>
            <div className="contact-item">
              <h3>📧 Email</h3>
              <p><a href="mailto:info@quantivo.com">info@quantivo.com</a></p>
            </div>
            <div className="contact-item">
              <h3>📱 Phone</h3>
              <p><a href="tel:+917079308040">+91 7079308040</a></p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
