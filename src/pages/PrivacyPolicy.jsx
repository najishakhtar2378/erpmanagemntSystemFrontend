import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <div className="privacy-page">
      <div className="privacy-header">
        <h1>🔐 Privacy Policy</h1>
        <p>Last Updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="privacy-container">
        <section className="privacy-section">
          <h2>1. Introduction</h2>
          <p>
            Quantivo ERP ("Company," "we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains 
            how we collect, use, disclose, and otherwise process personal information in connection with our platform and services.
          </p>
        </section>

        <section className="privacy-section">
          <h2>2. Information We Collect</h2>
          <h3>2.1 Information You Provide</h3>
          <ul>
            <li><strong>Account Information:</strong> Name, email address, phone number, company details</li>
            <li><strong>Business Data:</strong> Customer information, product details, sales data, inventory records</li>
            <li><strong>Communication Data:</strong> Messages, feedback, support requests</li>
            <li><strong>Payment Information:</strong> Billing details and transaction records (processed securely)</li>
          </ul>

          <h3>2.2 Information Collected Automatically</h3>
          <ul>
            <li><strong>Usage Data:</strong> Pages visited, features used, time spent on platform</li>
            <li><strong>Technical Data:</strong> IP address, browser type, device information, operating system</li>
            <li><strong>Cookies:</strong> We use cookies to enhance your experience and analyze platform usage</li>
            <li><strong>Analytics:</strong> Data collected through analytics tools to understand user behavior</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>Providing and maintaining the Quantivo ERP platform</li>
            <li>Creating and managing your account</li>
            <li>Processing transactions and sending billing information</li>
            <li>Sending you service updates and support messages</li>
            <li>Improving and optimizing our platform and services</li>
            <li>Analyzing usage patterns to enhance user experience</li>
            <li>Detecting and preventing fraudulent activities</li>
            <li>Complying with legal obligations</li>
            <li>Marketing and promotional purposes (with your consent)</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>4. Data Sharing and Disclosure</h2>
          <p>
            We do not sell, trade, or rent your personal information. However, we may share your information in the following circumstances:
          </p>
          <ul>
            <li><strong>Service Providers:</strong> Third-party providers who assist in operating our platform</li>
            <li><strong>Business Partners:</strong> When you authorize integrations with other services</li>
            <li><strong>Legal Requirements:</strong> When required by law, court order, or government requests</li>
            <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
            <li><strong>With Your Consent:</strong> When you explicitly authorize sharing of your information</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>5. Data Security</h2>
          <p>
            We implement comprehensive security measures to protect your personal information from unauthorized access, alteration, 
            disclosure, or destruction. These measures include:
          </p>
          <ul>
            <li>SSL/TLS encryption for data in transit</li>
            <li>AES-256 encryption for sensitive data at rest</li>
            <li>Regular security audits and updates</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Secure firewalls and intrusion detection systems</li>
            <li>Employee training on data protection</li>
          </ul>
          <p>
            However, no security system is completely impenetrable. We cannot guarantee absolute security of your information.
          </p>
        </section>

        <section className="privacy-section">
          <h2>6. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. 
            You may request deletion of your data, subject to our legal obligations.
          </p>
        </section>

        <section className="privacy-section">
          <h2>7. Your Rights</h2>
          <p>You have the following rights regarding your personal information:</p>
          <ul>
            <li><strong>Access:</strong> Right to access and obtain a copy of your data</li>
            <li><strong>Correction:</strong> Right to correct inaccurate or incomplete information</li>
            <li><strong>Deletion:</strong> Right to request deletion of your data</li>
            <li><strong>Portability:</strong> Right to receive your data in a portable format</li>
            <li><strong>Objection:</strong> Right to object to certain data processing activities</li>
            <li><strong>Opt-Out:</strong> Right to opt-out of marketing communications</li>
          </ul>
          <p>
            To exercise these rights, please contact us at <a href="mailto:privacy@quantivo.com">privacy@quantivo.com</a>
          </p>
        </section>

        <section className="privacy-section">
          <h2>8. Cookies and Tracking Technologies</h2>
          <p>
            Quantivo ERP uses cookies and similar tracking technologies to enhance your experience. You can control cookie settings 
            through your browser preferences. Please note that disabling cookies may affect platform functionality.
          </p>
        </section>

        <section className="privacy-section">
          <h2>9. Third-Party Links</h2>
          <p>
            Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. 
            Please review their privacy policies before providing any personal information.
          </p>
        </section>

        <section className="privacy-section">
          <h2>10. Children's Privacy</h2>
          <p>
            Quantivo ERP is not intended for children under the age of 13. We do not knowingly collect personal information from children. 
            If you believe we have collected information from a child, please contact us immediately.
          </p>
        </section>

        <section className="privacy-section">
          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy 
            on our platform and updating the "Last Updated" date.
          </p>
        </section>

        <section className="privacy-section">
          <h2>12. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us:
          </p>
          <div className="contact-info">
            <p><strong>Email:</strong> <a href="mailto:privacy@quantivo.com">privacy@quantivo.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+917079308040">+91 7079308040</a></p>
            <p><strong>Address:</strong> HathiBarKala, Rajpur Road, Dehradun, Uttarakhand, India</p>
          </div>
        </section>
      </div>
    </div>
  );
}
