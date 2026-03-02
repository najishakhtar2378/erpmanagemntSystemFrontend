import "./ProductCategory.css";

export default function Electronics() {
  const products = [
    {
      id: 1,
      name: "Laptops",
      image: "💻",
      description: "High-performance laptops for business and personal use",
      specs: ["Intel/AMD processors", "8GB-32GB RAM", "256GB-1TB SSD", "13-17 inch displays"]
    },
    {
      id: 2,
      name: "Smartphones",
      image: "📱",
      description: "Latest smartphones with cutting-edge technology",
      specs: ["5G enabled", "High resolution cameras", "Large batteries", "Fast charging"]
    },
    {
      id: 3,
      name: "Tablets",
      image: "📲",
      description: "Portable tablets for entertainment and productivity",
      specs: ["7-12 inch screens", "Powerful processors", "Long battery life", "Stylus support"]
    },
    {
      id: 4,
      name: "Smartwatches",
      image: "⌚",
      description: "Wearable smartwatches with fitness tracking",
      specs: ["Heart rate monitor", "Sleep tracking", "Water resistant", "Multiple sport modes"]
    },
    {
      id: 5,
      name: "Headphones",
      image: "🎧",
      description: "Premium audio headphones and earbuds",
      specs: ["Noise cancellation", "Wireless connectivity", "30+ hours battery", "Comfortable fit"]
    },
    {
      id: 6,
      name: "Gaming Consoles",
      image: "🎮",
      description: "Latest gaming consoles for ultimate gaming experience",
      specs: ["4K gaming", "Exclusive titles", "Online multiplayer", "Fast load times"]
    }
  ];

  return (
    <div className="product-category-page">
      <div className="category-header">
        <h1>💻 Electronics Products</h1>
        <p>Cutting-edge electronics and gadgets for modern living</p>
      </div>

      <div className="category-container">
        <section className="category-intro">
          <h2>Our Electronics Collection</h2>
          <p>
            Quantivo ERP offers a comprehensive range of high-quality electronics products. 
            From powerful laptops to the latest smartphones, we provide everything you need 
            to stay connected and productive. All our electronics are sourced from trusted 
            manufacturers and come with warranty support.
          </p>
        </section>

        <section className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">{product.image}</div>
              <h3>{product.name}</h3>
              <p className="product-desc">{product.description}</p>
              <div className="product-specs">
                <h4>Key Features:</h4>
                <ul>
                  {product.specs.map((spec, idx) => (
                    <li key={idx}>✓ {spec}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        <section className="category-features">
          <h2>Why Choose Our Electronics?</h2>
          <div className="features-list">
            <div className="feature">
              <h3>🔒 Authentic Products</h3>
              <p>100% genuine products directly from manufacturers</p>
            </div>
            <div className="feature">
              <h3>📦 Fast Delivery</h3>
              <p>Quick delivery to your doorstep within 3-5 business days</p>
            </div>
            <div className="feature">
              <h3>🛡️ Warranty Support</h3>
              <p>Complete warranty coverage and after-sales service</p>
            </div>
            <div className="feature">
              <h3>💰 Competitive Pricing</h3>
              <p>Best prices in the market with special discounts</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
