import "./ProductCategory.css";

export default function Clothing() {
  const products = [
    {
      id: 1,
      name: "Men's Formal Wear",
      image: "👔",
      description: "Professional formal shirts, pants, and ties",
      specs: ["Premium cotton blend", "Wrinkle-resistant", "Easy to maintain", "All sizes available"]
    },
    {
      id: 2,
      name: "Women's Fashion",
      image: "👗",
      description: "Trendy and stylish women's clothing collection",
      specs: ["Latest designs", "Comfortable fit", "Variety of colors", "Eco-friendly fabrics"]
    },
    {
      id: 3,
      name: "Casual Wear",
      image: "👕",
      description: "Comfortable casual t-shirts and jeans",
      specs: ["Soft fabric", "Breathable material", "Durable stitching", "Fade-resistant"]
    },
    {
      id: 4,
      name: "Sportswear",
      image: "🏃",
      description: "Athletic clothing for sports and fitness",
      specs: ["Moisture-wicking", "Flexible fabric", "UV protection", "Quick-dry technology"]
    },
    {
      id: 5,
      name: "Winter Collection",
      image: "🧥",
      description: "Warm jackets and sweaters for cold weather",
      specs: ["Insulated lining", "Water-resistant", "Lightweight", "Stylish design"]
    },
    {
      id: 6,
      name: "Accessories",
      image: "🕶️",
      description: "Belts, scarves, hats, and fashion accessories",
      specs: ["Various styles", "Premium quality", "Affordable prices", "Trending designs"]
    }
  ];

  return (
    <div className="product-category-page">
      <div className="category-header">
        <h1>👗 Clothing Products</h1>
        <p>Stylish and comfortable clothing for every occasion</p>
      </div>

      <div className="category-container">
        <section className="category-intro">
          <h2>Our Fashion Collection</h2>
          <p>
            Discover our extensive range of high-quality clothing for men, women, and children. 
            We offer everything from casual wear to formal attire, all crafted with premium 
            fabrics and attention to detail. Whether you're looking for everyday comfort or 
            special occasion outfits, we have something for everyone.
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
          <h2>Why Choose Our Clothing?</h2>
          <div className="features-list">
            <div className="feature">
              <h3>🎨 Latest Trends</h3>
              <p>Fashion-forward designs from top designers</p>
            </div>
            <div className="feature">
              <h3>🧵 Quality Fabrics</h3>
              <p>Premium materials for maximum comfort and durability</p>
            </div>
            <div className="feature">
              <h3>💚 Eco-Friendly</h3>
              <p>Sustainable and environmentally conscious products</p>
            </div>
            <div className="feature">
              <h3>📏 Perfect Fit</h3>
              <p>All sizes available with detailed size guides</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
