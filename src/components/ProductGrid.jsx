
// ProductGrid.jsx
import React, { useMemo, useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { products as allProducts } from "./data/products";
import ProductCard from "./ProductCard";
import "./css/ProductGrid.css";


export default function ProductGrid() {
  const { categoryName } = useParams(); // optional route param

  if (!categoryName) {
    return <HomeCategories allProducts={allProducts} />;
  }
  return <CategoryPage allProducts={allProducts} categoryName={categoryName} />;
}

// ---------------- Home (category sliders like Flipkart) ----------------
function HomeCategories({ allProducts }) {
  const categories = useMemo(
    () => [...new Set(allProducts.map((p) => p.category))],
    [allProducts]
  );

  const rowRefs = useRef({});

  const scrollRow = (cat, offset) => {
    const row = rowRefs.current[cat];
    if (row) {
      row.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="home-categories">
      {categories.map((cat) => {
        const preview = allProducts
          .filter((p) => p.category === cat)
          .slice(0, 20);

        return (
          <section key={cat} className="category-block">
            <div className="category-header">
              <h3>{cat}</h3>
              <Link
                to={`/category/${encodeURIComponent(cat)}`}
                className="see-all-link"
              >
                See All →
              </Link>
            </div>

            <div className="slider-wrapper">
              {/* Left button */}
              <button
                className="scroll-btn left"
                onClick={() => scrollRow(cat, -300)}
              >
                ‹
              </button>

              <div
                className="cards-row"
                ref={(el) => (rowRefs.current[cat] = el)}
              >
                {preview.map((p) => (
                  <div key={p.id} className="card-slide">
                    <ProductCard product={p} />
                  </div>
                ))}

                {/* Last card: "View all" */}
                <div className="card-slide view-all-card">
                  <Link to={`/category/${encodeURIComponent(cat)}`}>
                    <div className="view-all-content">
                      <span>+ View all {cat}</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Right button */}
              <button
                className="scroll-btn right"
                onClick={() => scrollRow(cat, 300)}
              >
                ›
              </button>
            </div>
          </section>
        );
      })}
    </div>
  );
}



// ---------------- Category page with infinite scroll ----------------
function CategoryPage({ allProducts, categoryName }) {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 20;
  const sentinelRef = useRef(null);
  const [visible, setVisible] = useState([]);

  const filtered = useMemo(() => {
    const items = allProducts.filter((p) => p.category === categoryName);
    const q = search.toLowerCase();
    const min = minPrice ? parseInt(minPrice, 10) : -Infinity;
    const max = maxPrice ? parseInt(maxPrice, 10) : Infinity;

    return items.filter(
      (p) =>
        (!q ||
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)) &&
        p.price >= min &&
        p.price <= max
    );
  }, [allProducts, categoryName, search, minPrice, maxPrice]);

  useEffect(() => {
    setPage(1);
    setVisible(filtered.slice(0, PAGE_SIZE));
  }, [filtered]);

  useEffect(() => {
    if (page === 1) return;
    const next = filtered.slice(0, page * PAGE_SIZE);
    setVisible(next);
  }, [page, filtered]);

  const hasMore = visible.length < filtered.length;

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((p) => p + 1);
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore]);

  return (
    <div className="category-page">
      <h2>{categoryName}</h2>
      {/* Filters */}
      <div className="filters">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min ₹"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max ₹"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button onClick={() => { setSearch(""); setMinPrice(""); setMaxPrice(""); }}>
          Reset
        </button>
      </div>

      {/* Grid */}
      <div className="product-grid">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {hasMore && <div ref={sentinelRef} style={{ height: 2 }} />}
      </div>
    </div>
  );
}
