import "./Security.css";

export default function Security() {
  return (
    <div className="security-page">
      <div className="security-hero">
        <div className="security-hero-content">
          <h1>🛡️ Security at Quantivo ERP</h1>
          <p className="hero-subtitle">Enterprise-Grade Security to Protect Your Business</p>
        </div>
      </div>

      <div className="security-container">
        <section className="security-section">
          <h2>Security is Our Top Priority</h2>
          <p>
            At Quantivo ERP, we understand that your business data is critical. We've implemented comprehensive security measures 
            to protect your information and ensure the integrity of our platform. Our security framework is built on industry best 
            practices and compliance standards.
          </p>
        </section>

        {/* Data Protection */}
        <section className="security-section">
          <h2>🔐 Data Protection</h2>
          <div className="security-grid">
            <div className="security-card">
              <h3>Encryption in Transit</h3>
              <p>All data transmitted between your browser and our servers is encrypted using TLS/SSL (up to 256-bit).</p>
            </div>
            <div className="security-card">
              <h3>Encryption at Rest</h3>
              <p>Sensitive data stored in our databases is encrypted using AES-256 encryption standards.</p>
            </div>
            <div className="security-card">
              <h3>Database Security</h3>
              <p>Multiple layers of security controls protect databases including firewalls, access controls, and monitoring.</p>
            </div>
            <div className="security-card">
              <h3>Backup & Recovery</h3>
              <p>Regular automated backups ensure your data is safe and can be recovered in case of any incident.</p>
            </div>
          </div>
        </section>

        {/* Access Control */}
        <section className="security-section">
          <h2>👤 Access Control & Authentication</h2>
          <div className="security-features">
            <div className="feature-item">
              <h3>✓ Role-Based Access Control (RBAC)</h3>
              <p>
                Different user roles (Admin, Manager, Staff) have specific permissions ensuring users only access 
                information they need.
              </p>
            </div>
            <div className="feature-item">
              <h3>✓ Strong Authentication</h3>
              <p>
                Passwords are hashed using industry-standard algorithms. We enforce strong password policies 
                including complexity requirements.
              </p>
            </div>
            <div className="feature-item">
              <h3>✓ Session Management</h3>
              <p>
                Secure session tokens with expiration times prevent unauthorized access. Automatic logout after 
                30 minutes of inactivity.
              </p>
            </div>
            <div className="feature-item">
              <h3>✓ Audit Logging</h3>
              <p>
                All user actions are logged for security auditing and compliance purposes. Suspicious activities 
                are monitored and detected.
              </p>
            </div>
          </div>
        </section>

        {/* Infrastructure Security */}
        <section className="security-section">
          <h2>🏢 Infrastructure Security</h2>
          <ul className="security-list">
            <li><strong>Firewall Protection:</strong> Advanced firewalls protect against unauthorized access attempts</li>
            <li><strong>DDoS Protection:</strong> Protection against distributed denial-of-service attacks</li>
            <li><strong>Intrusion Detection:</strong> Real-time monitoring to detect and prevent unauthorized access</li>
            <li><strong>Network Segmentation:</strong> Networks are segmented to isolate critical systems</li>
            <li><strong>Load Balancing:</strong> Distributed architecture ensures reliability and prevents single points of failure</li>
            <li><strong>99.9% Uptime SLA:</strong> Infrastructure designed for high availability and reliability</li>
          </ul>
        </section>

        {/* Application Security */}
        <section className="security-section">
          <h2>💻 Application Security</h2>
          <div className="security-features">
            <div className="feature-item">
              <h3>✓ OWASP Compliance</h3>
              <p>Our application follows OWASP security guidelines to prevent common vulnerabilities.</p>
            </div>
            <div className="feature-item">
              <h3>✓ Regular Security Testing</h3>
              <p>We conduct regular penetration testing and vulnerability assessments.</p>
            </div>
            <div className="feature-item">
              <h3>✓ Code Reviews</h3>
              <p>All code changes undergo security review before deployment.</p>
            </div>
            <div className="feature-item">
              <h3>✓ Dependency Management</h3>
              <p>Third-party dependencies are regularly updated to patch security vulnerabilities.</p>
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section className="security-section">
          <h2>📋 Compliance & Standards</h2>
          <p>Quantivo ERP adheres to the following security standards and regulations:</p>
          <ul className="compliance-list">
            <li>🔒 GDPR - General Data Protection Regulation compliance</li>
            <li>🔒 ISO 27001 - Information Security Management System</li>
            <li>🔒 SOC 2 - Service Organization Control compliance</li>
            <li>🔒 Data Protection Laws - Compliance with local data protection regulations</li>
            <li>🔒 PCI DSS - For payment information security</li>
          </ul>
        </section>

        {/* Incident Response */}
        <section className="security-section">
          <h2>🚨 Incident Response</h2>
          <p>
            We have a comprehensive incident response plan in place to address any security incidents promptly and effectively:
          </p>
          <ul className="security-list">
            <li><strong>24/7 Security Monitoring:</strong> Continuous monitoring for potential security threats</li>
            <li><strong>Rapid Response Team:</strong> Dedicated team responds to incidents immediately</li>
            <li><strong>Investigation & Containment:</strong> Swift investigation and containment of issues</li>
            <li><strong>User Notification:</strong> Transparency in communicating incidents to affected users</li>
            <li><strong>Recovery Procedures:</strong> Documented procedures for system recovery and continuity</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="security-section">
          <h2>🎯 Security Best Practices for Users</h2>
          <p>To further protect your account and data, we recommend:</p>
          <ul className="security-list">
            <li>✓ Use strong, unique passwords</li>
            <li>✓ Change passwords periodically</li>
            <li>✓ Do not share account credentials</li>
            <li>✓ Log out when using shared computers</li>
            <li>✓ Be cautious of phishing attempts</li>
            <li>✓ Keep your browser and device updated</li>
            <li>✓ Use secure internet connections</li>
            <li>✓ Report suspicious activities immediately</li>
          </ul>
        </section>

        {/* Reporting Vulnerabilities */}
        <section className="security-section vulnerability">
          <h2>🔍 Reporting Security Vulnerabilities</h2>
          <p>
            If you discover a security vulnerability, please report it responsibly to our security team rather than 
            disclosing it publicly. This helps us address the issue before it can be exploited.
          </p>
          <div className="contact-info">
            <p><strong>Security Issues:</strong> <a href="mailto:security@quantivo.com">security@quantivo.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+917079308040">+91 7079308040</a></p>
          </div>
        </section>

        {/* Continuous Improvement */}
        <section className="security-section">
          <h2>📈 Continuous Improvement</h2>
          <p>
            Security is an ongoing process. We continuously:
          </p>
          <ul className="security-list">
            <li>Monitor emerging threats and vulnerabilities</li>
            <li>Update security measures and protocols</li>
            <li>Train our team on latest security practices</li>
            <li>Conduct regular security audits and assessments</li>
            <li>Invest in advanced security technologies</li>
            <li>Gather feedback from users on security improvements</li>
          </ul>
        </section>

        {/* Contact */}
        <section className="security-section contact-section">
          <h2>📞 Questions About Security?</h2>
          <p>
            If you have any questions or concerns about our security practices, please don't hesitate to contact us.
          </p>
          <div className="contact-info">
            <p><strong>Email:</strong> <a href="mailto:security@quantivo.com">security@quantivo.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+917079308040">+91 7079308040</a></p>
            <p><strong>Address:</strong> HathiBarKala, Rajpur Road, Dehradun, Uttarakhand, India</p>
          </div>
        </section>
      </div>
    </div>
  );
}
