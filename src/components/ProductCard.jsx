
// // ProductCard.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import "./css/ProductCard.css";

// export default function ProductCard({ product }) {
//   return (
//     <Link to={`/product/${encodeURIComponent(product.category)}/${product.id}`}  className="product-card-link">
//       <div className="product-card">
//         <img src={product.image} alt={product.name} />
//         <div className="info">
//           <h4>{product.name}</h4>
//           <p className="desc">{product.description}</p>
//           <div className="price">₹{product.price.toLocaleString()}</div>
//           <div className="rating">⭐ {product.rating}</div>
//         </div>
//       </div>
//     </Link>
//   );
// }
// ProductCard.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./css/ProductCard.css"; // contains both .style1 and .style2

export default function ProductCard({ product }) {
  const location = useLocation();

  // condition: home vs category page
  const isHome = location.pathname === "/";
  const cardClass = isHome ? "product-card style1" : "product-card style2";

  return (
    <Link
      to={`/product/${encodeURIComponent(product.category)}/${product.id}`}
      className="product-card-link"
    >
      <div className={cardClass}>
        <img src={product.image} alt={product.name} />
        <div className="info">
          <h4>{product.name}</h4>
          <p className="desc">{product.description}</p>
          <div className="price">₹{product.price.toLocaleString()}</div>
          <div className="rating">⭐ {product.rating}</div>
        </div>
      </div>
    </Link>
  );
}

