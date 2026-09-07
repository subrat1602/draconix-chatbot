import Chatbot from "@/components/Chatbot/Chatbot";

export default function Home() {
  return (
    <main className="site-container">
      {/* Navigation */}
      <nav className="site-nav">
        <a href="#" className="brand-logo">
          <div className="brand-icon-box">D</div>
          <span>Draconix <span className="brand-gradient-text">Digital</span></span>
        </a>
        <ul className="nav-links">
          <li><a href="#services" className="nav-link">Services</a></li>
          <li><a href="#store" className="nav-link">Digital Store</a></li>
          <li><a href="#tech" className="nav-link">Technology</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
        </ul>
        <button className="nav-cta">Get in Touch</button>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          ✨ Next-Generation Digital Experiences
        </div>
        <h1 className="hero-title">
          Powering the Future of <br />
          <span className="brand-gradient-text">Digital Commerce & Solutions</span>
        </h1>
        <p className="hero-subtitle">
          Draconix Digital builds scalable web applications, software, e-commerce stores, and high-impact digital branding for forward-thinking enterprises.
        </p>
        <div className="hero-actions">
          <button className="btn-primary">
            Explore Offerings
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          <button className="btn-secondary">View Case Studies</button>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="features-section">
        <span className="section-tag">Core Capabilities</span>
        <h2 className="section-title">End-to-End Digital Solutions</h2>
        <div className="cards-grid">
          <div className="service-card">
            <span className="card-icon">🌐</span>
            <h3 className="card-title">Web & App Engineering</h3>
            <p className="card-desc">Modern web applications, cross-platform mobile apps, and robust API architectures built with leading web technologies.</p>
          </div>
          <div className="service-card">
            <span className="card-icon">🛍️</span>
            <h3 className="card-title">Digital Commerce Store</h3>
            <p className="card-desc">Complete e-commerce infrastructure supporting jewellery, fashion, restaurant ordering, and hardware supplies.</p>
          </div>
          <div className="service-card">
            <span className="card-icon">📈</span>
            <h3 className="card-title">SEO & Digital Marketing</h3>
            <p className="card-desc">Data-backed search optimization, social branding, and customer acquisition funnels that drive sustainable growth.</p>
          </div>
          <div className="service-card">
            <span className="card-icon">🔧</span>
            <h3 className="card-title">On-Demand Services</h3>
            <p className="card-desc">Connected platform solutions including plumbing service booking, instant quotes, and customer assistance.</p>
          </div>
        </div>
      </section>

      {/* Interactive Chatbot Banner callout */}
      <section className="assistant-banner">
        <div className="banner-content">
          <h3>Have questions about Draconix Digital?</h3>
          <p>Click the <strong>Draconix Assistant</strong> floating button in the bottom-right corner to get instant answers about our services, products, and contact options.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Draconix Digital. All rights reserved. Built with Next.js and React.</p>
      </footer>

      {/* Floating Draconix Assistant Chatbot Widget */}
      <Chatbot />
    </main>
  );
}
