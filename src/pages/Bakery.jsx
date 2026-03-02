import "./ProductCategory.css";

export default function Bakery() {
  const products = [
    {
      id: 1,
      name: "Bread & Loaves",
      image: "🍞",
      description: "Fresh baked bread and whole wheat loaves",
      specs: ["Baked daily", "No preservatives", "Soft & fluffy", "Multiple varieties"]
    },
    {
      id: 2,
      name: "Pastries & Croissants",
      image: "🥐",
      description: "Buttery pastries and delicious croissants",
      specs: ["Butter-rich", "Flaky texture", "Fresh baked", "Premium ingredients"]
    },
    {
      id: 3,
      name: "Cakes & Desserts",
      image: "🎂",
      description: "Custom cakes and sweet desserts",
      specs: ["Made to order", "Fresh cream", "Customizable designs", "Celebration ready"]
    },
    {
      id: 4,
      name: "Cookies & Biscuits",
      image: "🍪",
      description: "Crispy cookies and delicious biscuits",
      specs: ["Home-made taste", "Various flavors", "Long shelf life", "Bite-sized portions"]
    },
    {
      id: 5,
      name: "Donuts & Pastries",
      image: "🍩",
      description: "Sweet donuts with various toppings and fillings",
      specs: ["Freshly fried", "Glazed varieties", "Fillings included", "Daily special flavors"]
    },
    {
      id: 6,
      name: "Whole Grain Options",
      image: "🌾",
      description: "Healthy whole grain baked products",
      specs: ["High fiber", "Nutritious", "Organic ingredients", "Health-conscious choices"]
    }
  ];

  return (
    <div className="product-category-page">
      <div className="category-header">
        <h1>🍞 Bakery Products</h1>
        <p>Fresh baked goods and delicious pastries</p>
      </div>

      <div className="category-container">
        <section className="category-intro">
          <h2>Our Bakery Selection</h2>
          <p>
            Indulge in our freshly baked bakery products, prepared with love and premium 
            ingredients. From traditional breads to delectable cakes and pastries, every 
            item is baked fresh daily. We offer both classic favorites and innovative 
            flavors to satisfy every taste. Perfect for breakfast, desserts, or special occasions.
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
          <h2>Why Choose Our Bakery?</h2>
          <div className="features-list">
            <div className="feature">
              <h3>🎂 Fresh Daily</h3>
              <p>Baked fresh every morning with premium ingredients</p>
            </div>
            <div className="feature">
              <h3>🎨 Customizable</h3>
              <p>Custom cakes and special orders for events</p>
            </div>
            <div className="feature">
              <h3>🌱 Healthy Options</h3>
              <p>Whole grain and sugar-free options available</p>
            </div>
            <div className="feature">
              <h3>🚚 Quick Delivery</h3>
              <p>Fresh delivery within 2 hours of ordering</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
