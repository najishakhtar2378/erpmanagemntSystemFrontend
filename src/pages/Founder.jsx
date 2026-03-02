import "./Founder.css";

export default function Founder() {
  return (
    <div className="founder-page">
      {/* Hero Section */}
      <div className="founder-hero">
        <div className="founder-hero-content">
          <h1>👨‍💼 Meet Our Founder</h1>
          <p className="hero-subtitle">Visionary Leader & Technology Innovator</p>
        </div>
      </div>

      {/* Founder Container */}
      <div className="founder-container">
        {/* Main Founder Profile */}
        <section className="founder-profile">
          <div className="founder-image">
            <img 
              src="/images/founder.jpg" 
              alt="Er. Najish Akhtar - Founder & CEO Quantivo ERP" 
              className="founder-img"
              onError={(e) => e.target.src = "/images/founder"}
            />
          </div>

          <div className="founder-info">
            <h2>Er. Najish Akhtar</h2>
            <p className="founder-title">Founder & CEO, Quantivo ERP</p>
            <p className="founder-education">B-Tech in Computer Science Engineering</p>

            <div className="founder-bio">
              <h3>About Er. Najish Akhtar</h3>
              <p>
                Er. Najish Akhtar is the visionary founder and CEO of Quantivo ERP, an enterprise resource planning platform 
                designed to revolutionize business management. With a strong background in Computer Science Engineering, 
                Najish brings both technical expertise and entrepreneurial passion to the table.
              </p>

              <p>
                His journey began with a simple but powerful vision: to create an ERP solution that is not just powerful 
                and feature-rich, but also intuitive and accessible to businesses of all sizes. This vision has driven the 
                development of Quantivo ERP into a comprehensive platform that helps organizations streamline operations, 
                enhance customer relationships, and accelerate growth.
              </p>
            </div>

            {/* Key Qualities */}
            <div className="founder-qualities">
              <h3>Key Qualities</h3>
              <div className="qualities-grid">
                <div className="quality-item">
                  <span className="quality-icon">💡</span>
                  <div>
                    <h4>Innovation</h4>
                    <p>Constantly pushing boundaries to create cutting-edge solutions</p>
                  </div>
                </div>
                <div className="quality-item">
                  <span className="quality-icon">🎯</span>
                  <div>
                    <h4>Vision</h4>
                    <p>Clear long-term strategy for business transformation</p>
                  </div>
                </div>
                <div className="quality-item">
                  <span className="quality-icon">💪</span>
                  <div>
                    <h4>Leadership</h4>
                    <p>Inspiring and guiding teams toward excellence</p>
                  </div>
                </div>
                <div className="quality-item">
                  <span className="quality-icon">🤝</span>
                  <div>
                    <h4>Customer Focus</h4>
                    <p>Always prioritizing customer satisfaction and success</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="expertise-section">
          <h3>Areas of Expertise</h3>
          <div className="expertise-grid">
            <div className="expertise-card">
              <h4>🏢 Enterprise Solutions</h4>
              <p>Comprehensive understanding of enterprise resource planning and business operations</p>
            </div>
            <div className="expertise-card">
              <h4>💻 Software Development</h4>
              <p>Deep technical knowledge in modern web technologies and software architecture</p>
            </div>
            <div className="expertise-card">
              <h4>📊 Business Strategy</h4>
              <p>Strategic planning and execution of business growth initiatives</p>
            </div>
            <div className="expertise-card">
              <h4>🌐 Technology Innovation</h4>
              <p>Staying ahead of technological trends and implementing cutting-edge solutions</p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="vision-section">
          <h3>🎯 Our Founder's Vision</h3>
          <div className="vision-content">
            <p>
              "At Quantivo ERP, we believe that every business, regardless of its size or industry, deserves access to 
              world-class ERP solutions. My mission is to democratize enterprise technology and make it simple, affordable, 
              and effective for everyone."
            </p>
            <p className="founder-quote">
              – Er. Najish Akhtar, Founder & CEO
            </p>
          </div>
        </section>

        {/* Journey Section */}
        <section className="journey-section">
          <h3>📈 Journey Highlights</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker">📚</div>
              <div className="timeline-content">
                <h4>Education</h4>
                <p>Completed B-Tech degree in Computer Science Engineering with focus on enterprise software development</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker">💼</div>
              <div className="timeline-content">
                <h4>Industry Experience</h4>
                <p>Gained valuable experience in developing and implementing enterprise solutions</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker">🚀</div>
              <div className="timeline-content">
                <h4>Founding Quantivo ERP</h4>
                <p>Launched Quantivo ERP with a vision to transform business management for enterprises worldwide</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker">🌟</div>
              <div className="timeline-content">
                <h4>Current Mission</h4>
                <p>Leading Quantivo ERP in providing innovative, customer-centric ERP solutions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Experience Section */}
        <section className="professional-experience-section">
          <h3>💻 Professional Experience</h3>
          <div className="experience-card">
            <div className="experience-header">
              <h4>Tecxed</h4>
              <p className="experience-location">🌍 Singapore HQ | 📍 Dehradun Office</p>
            </div>
            <div className="experience-details">
              <p className="experience-role">Professional Developer & Technical Expert</p>
              <p className="experience-description">
                Currently working as a professional developer at Tecxed, a dynamic technology company with global presence. 
                Headquartered in Singapore, with a thriving office in Dehradun, India, Tecxed provides cutting-edge technology 
                solutions to enterprises worldwide.
              </p>
              <div className="experience-highlights">
                <h5>Key Responsibilities:</h5>
                <ul>
                  <li>Developing enterprise-level software solutions</li>
                  <li>Collaborating with international teams across Singapore and Dehradun offices</li>
                  <li>Implementing innovative technology architectures</li>
                  <li>Contributing to global technology initiatives</li>
                  <li>Mentoring junior developers and sharing technical expertise</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="philosophy-section">
          <h3>🧠 Leadership Philosophy</h3>
          <div className="philosophy-cards">
            <div className="philosophy-card">
              <h4>Customer-Centric Approach</h4>
              <p>Building solutions that directly address customer pain points and create real value</p>
            </div>
            <div className="philosophy-card">
              <h4>Continuous Learning</h4>
              <p>Fostering a culture of continuous improvement and innovation within the organization</p>
            </div>
            <div className="philosophy-card">
              <h4>Transparency & Trust</h4>
              <p>Maintaining transparent communication with customers, partners, and team members</p>
            </div>
            <div className="philosophy-card">
              <h4>Excellence</h4>
              <p>Pursuing excellence in every aspect of product development and customer service</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
