import "./ProductCategory.css";

export default function FoodItems() {
  const products = [
    {
      id: 1,
      name: "Fresh Vegetables",
      image: "🥦",
      description: "Organic fresh vegetables delivered daily",
      specs: ["Farm-fresh", "No pesticides", "Locally sourced", "Delivered daily"]
    },
    {
      id: 2,
      name: "Fresh Fruits",
      image: "🍎",
      description: "Seasonal fresh fruits rich in nutrients",
      specs: ["Handpicked", "Ripened naturally", "No chemicals", "Maximum freshness"]
    },
    {
      id: 3,
      name: "Dairy Products",
      image: "🥛",
      description: "Milk, yogurt, cheese, and dairy essentials",
      specs: ["Pure milk", "No additives", "Hygienically packed", "Cold chain maintained"]
    },
    {
      id: 4,
      name: "Spices & Seasonings",
      image: "🌶️",
      description: "Authentic spices and seasonings for cooking",
      specs: ["Freshly ground", "Premium quality", "Authentic flavor", "Airtight packaging"]
    },
    {
      id: 5,
      name: "Grains & Pulses",
      image: "🌾",
      description: "Wholesome grains, rice, and pulses",
      specs: ["Organic certified", "Rich in fiber", "No additives", "Properly stored"]
    },
    {
      id: 6,
      name: "Oils & Condiments",
      image: "🫒",
      description: "Cooking oils, sauces, and condiments",
      specs: ["Cold-pressed", "Natural ingredients", "Long shelf life", "Pure & authentic"]
    }
  ];

  return (
    <div className="product-category-page">
      <div className="category-header">
        <h1>🥗 Food Items</h1>
        <p>Fresh and healthy food products for your family</p>
      </div>

      <div className="category-container">
        <section className="category-intro">
          <h2>Our Food Collection</h2>
          <p>
            Quantivo ERP brings you the freshest and highest quality food items directly from 
            farms and trusted suppliers. From organic vegetables and fruits to pure dairy 
            products and authentic spices, we ensure every product meets the highest 
            standards of quality and freshness. We are committed to providing healthy 
            and nutritious food options for your family.
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
          <h2>Why Choose Our Food Products?</h2>
          <div className="features-list">
            <div className="feature">
              <h3>🌱 Farm Fresh</h3>
              <p>Directly sourced from farms and producers</p>
            </div>
            <div className="feature">
              <h3>✅ Quality Assured</h3>
              <p>Rigorous quality checks and certifications</p>
            </div>
            <div className="feature">
              <h3>🚚 Swift Delivery</h3>
              <p>Same-day delivery to maintain freshness</p>
            </div>
            <div className="feature">
              <h3>💰 Best Value</h3>
              <p>Competitive prices with bulk discounts available</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
