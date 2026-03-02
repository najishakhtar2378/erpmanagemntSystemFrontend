import "./TermsConditions.css";

export default function TermsConditions() {
  return (
    <div className="terms-page">
      <div className="terms-header">
        <h1>📋 Terms & Conditions</h1>
        <p>Last Updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="terms-container">
        <section className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Quantivo ERP, you accept and agree to be bound by the terms and provision of this agreement. 
            If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials (information or software) on Quantivo ERP for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul>
            <li>Modifying or copying the materials</li>
            <li>Using the materials for any commercial purpose or for any public display</li>
            <li>Attempting to decompile or reverse engineer any software contained on the platform</li>
            <li>Removing any copyright or other proprietary notations from the materials</li>
            <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>3. Disclaimer of Warranties</h2>
          <p>
            The materials on Quantivo ERP are provided on an 'as-is' basis. Quantivo ERP makes no warranties, expressed or implied, 
            and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions 
            of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section className="terms-section">
          <h2>4. Limitations of Liability</h2>
          <p>
            In no event shall Quantivo ERP or its suppliers be liable for any damages (including, without limitation, damages for loss 
            of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Quantivo ERP, 
            even if Quantivo ERP or an authorized representative of Quantivo ERP has been notified orally or in writing of the possibility of such damage.
          </p>
        </section>

        <section className="terms-section">
          <h2>5. Accuracy of Materials</h2>
          <p>
            The materials appearing on Quantivo ERP could include technical, typographical, or photographic errors. Quantivo ERP does not 
            warrant that any of the materials on its platform are accurate, complete, or current. Quantivo ERP may make changes to the materials 
            contained on its platform at any time without notice.
          </p>
        </section>

        <section className="terms-section">
          <h2>6. Materials License</h2>
          <p>
            Quantivo ERP grants you a limited license to access and make personal use of this platform and the materials on this platform. 
            You may not otherwise reproduce any materials, in whole or in part, without the express written consent of Quantivo ERP.
          </p>
        </section>

        <section className="terms-section">
          <h2>7. User Accounts</h2>
          <p>
            If you create an account on Quantivo ERP, you are responsible for maintaining the confidentiality of your account information 
            and password and for restricting access to your account. You agree to accept responsibility for all activities that occur 
            under your account. You must notify Quantivo ERP immediately of any unauthorized uses of your account.
          </p>
        </section>

        <section className="terms-section">
          <h2>8. Prohibited Activities</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the intellectual property rights of others</li>
            <li>Harass, abuse, or threaten other users</li>
            <li>Attempt to gain unauthorized access to the platform</li>
            <li>Transmit viruses or malicious code</li>
            <li>Spam or send unsolicited messages</li>
            <li>Engage in any illegal or fraudulent activities</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>9. Data Protection</h2>
          <p>
            Your use of Quantivo ERP is also governed by our Privacy Policy. Please review our Privacy Policy to understand our 
            practices regarding the collection and use of your personal information.
          </p>
        </section>

        <section className="terms-section">
          <h2>10. Limitation of Use</h2>
          <p>
            By using Quantivo ERP, you warrant that you are at least 18 years of age and possess the legal authority to enter into this agreement. 
            Minors are not permitted to use Quantivo ERP without parental/guardian consent.
          </p>
        </section>

        <section className="terms-section">
          <h2>11. Termination</h2>
          <p>
            Quantivo ERP may terminate or suspend your account and access to the platform immediately, without prior notice or liability, 
            for any reason whatsoever, including if you breach the Terms of Service.
          </p>
        </section>

        <section className="terms-section">
          <h2>12. Changes to Terms</h2>
          <p>
            Quantivo ERP reserves the right to modify these terms and conditions at any time. Your continued use of the platform following 
            the posting of revised Terms means that you accept and agree to the changes.
          </p>
        </section>

        <section className="terms-section">
          <h2>13. Contact Information</h2>
          <p>
            If you have any questions about these Terms & Conditions, please contact us at:
          </p>
          <div className="contact-info">
            <p><strong>Email:</strong> <a href="mailto:info@quantivo.com">info@quantivo.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+917079308040">+91 7079308040</a></p>
            <p><strong>Address:</strong> HathiBarKala, Rajpur Road, Dehradun, Uttarakhand, India</p>
          </div>
        </section>
      </div>
    </div>
  );
}
