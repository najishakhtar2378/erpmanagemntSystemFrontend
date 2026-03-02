import "./ProductCategory.css";

export default function Grocery() {
  const products = [
    {
      id: 1,
      name: "Rice & Grains",
      image: "🍚",
      description: "Premium quality rice and various grains",
      specs: ["Basmati & regular", "Organic options", "Bulk available", "Properly polished"]
    },
    {
      id: 2,
      name: "Dal & Pulses",
      image: "🫘",
      description: "Fresh lentils and pulses for nutritious meals",
      specs: ["High protein", "Organic certified", "Sorted & cleaned", "Long shelf life"]
    },
    {
      id: 3,
      name: "Flour & Atta",
      image: "👨‍🌾",
      description: "Whole wheat flour and specialty flours",
      specs: ["Stone ground", "No additives", "Fresh milling", "Various options"]
    },
    {
      id: 4,
      name: "Canned Goods",
      image: "🥫",
      description: "Tinned vegetables, fruits, and beans",
      specs: ["Preservative-free", "Quality ingredients", "Long shelf life", "Convenient portions"]
    },
    {
      id: 5,
      name: "Snacks & Chips",
      image: "🥨",
      description: "Healthy and tasty snack options",
      specs: ["Low salt", "Natural ingredients", "No artificial flavors", "Portable packing"]
    },
    {
      id: 6,
      name: "Beverages & Tea",
      image: "☕",
      description: "Coffee, tea, and energy drinks",
      specs: ["Premium blends", "Freshly roasted", "Organic options", "Various flavors"]
    }
  ];

  return (
    <div className="product-category-page">
      <div className="category-header">
        <h1>🛒 Grocery Products</h1>
        <p>Essential and everyday grocery items</p>
      </div>

      <div className="category-container">
        <section className="category-intro">
          <h2>Our Grocery Range</h2>
          <p>
            Complete your kitchen with our comprehensive grocery collection. We provide 
            everything from staple grains and pulses to specialty ingredients and convenient 
            snacks. All products are sourced from trusted suppliers and regularly checked for 
            quality. Shop conveniently and save time with our carefully curated selection 
            of everyday essentials.
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
          <h2>Why Choose Our Grocery?</h2>
          <div className="features-list">
            <div className="feature">
              <h3>🏪 One-Stop Shop</h3>
              <p>All grocery items in one convenient place</p>
            </div>
            <div className="feature">
              <h3>📋 Quality Checked</h3>
              <p>Every product verified for freshness and quality</p>
            </div>
            <div className="feature">
              <h3>💳 Easy Payments</h3>
              <p>Multiple payment options and flexible billing</p>
            </div>
            <div className="feature">
              <h3>📦 Free Shipping</h3>
              <p>Free delivery on orders above minimum amount</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
