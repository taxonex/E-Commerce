// CategoryCarousel.jsx
import React, { useMemo } from "react";
import { products as allProducts } from "./data/products";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import "./css/ProductGrid.css";

export default function CategoryCarousel() {
  const categories = useMemo(
    () => ["All", ...new Set(allProducts.map((p) => p.category))],
    []
  );

  return (
    <div className="category-carousel">
      {categories.map((cat) => {
        const items =
          cat === "All"
            ? allProducts.slice(0, 20)
            : allProducts.filter((p) => p.category === cat).slice(0, 20);

        return (
          <section key={cat} className="category-block">
            <h3 className="category-title">{cat}</h3>
            <div className="cards-row">
              {items.map((p) => (
                <div className="card-slide" key={p.id}>
                  <ProductCard product={p} />
                </div>
              ))}

              {/* Last card: view all for this category */}
              <div className="card-slide view-all-card">
                <Link
                  to={`/category/${encodeURIComponent(cat)}`}
                  className="view-all-link"
                >
                  <div className="view-all-content">
                    <div className="plus">+</div>
                    <div>View all {cat} products</div>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
