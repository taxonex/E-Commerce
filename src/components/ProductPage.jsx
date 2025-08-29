// ProductPage.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "./data/products";
import "./css/ProductPage.css";

export default function ProductPage() {
  const { categoryName, productId } = useParams();

  const product = products.find(
    (p) =>
      p.id === Number(productId) &&
      p.category.toLowerCase() === categoryName.toLowerCase()
  );

  const [mainImg, setMainImg] = useState(product?.prodImg1 || product?.image);
  const [zoomOpen, setZoomOpen] = useState(false);

  if (!product) {
    return <h2 style={{ padding: "20px" }}>Product not found</h2>;
  }

  // collect available images
  const images = [
    product.prodImg1,
    product.prodImg2,
    product.prodImg3,
    product.prodImg4,
    product.prodImg5,
  ].filter(Boolean);

  return (
    <div className="product-page">
      {/* Left: images */}
      <div className="images-section">
        <img
          src={mainImg}
          alt={product.name}
          className="main-image"
          onClick={() => setZoomOpen(true)}
        />

        <div className="thumbnail-row">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${product.name} ${idx + 1}`}
              onClick={() => setMainImg(img)}
              className={mainImg === img ? "active-thumb" : ""}
            />
          ))}
        </div>
      </div>

      {/* Right: details */}
      <div className="details-section">
        <h1>{product.name}</h1>
        <div className="rating">⭐ {product.rating} / 5</div>
        <div className="price">₹{product.price.toLocaleString()}</div>
        <p className="desc">{product.description}</p>

        {/* Buy buttons */}
        <div className="btn-row">
          <button className="buy-btn">Buy Now</button>
          <button className="cart-btn">Add to Cart</button>
        </div>

        {/* Extra elements */}
        <div className="offers">
          <h3>Available Offers</h3>
          <ul>
            <li>💳 Bank Offer: 10% off on Axis Bank Credit Cards</li>
            <li>🚚 Free Delivery on orders above ₹499</li>
            <li>🔁 7-Day Replacement Guarantee</li>
          </ul>
        </div>

        <div className="specs">
          <h3>Specifications</h3>
          <ul>
            <li>Category: {product.category}</li>
            <li>Warranty: 1 year</li>
            <li>Delivery: Free, 3–5 days</li>
            <li>Seller: Trusted Seller Pvt Ltd</li>
          </ul>
        </div>

        <div className="extra-desc">
          <h3>Product Details</h3>
          <p>
            {product.longDescription ||
              "This is a high-quality product built with care. Perfect for everyday use with great durability and performance. Enjoy fast delivery and easy returns."}
          </p>
        </div>
      </div>

      {/* Zoom Modal */}
      {zoomOpen && (
        <div className="zoom-overlay" onClick={() => setZoomOpen(false)}>
          <span className="close-btn" onClick={() => setZoomOpen(false)}>✕</span>
          <img src={mainImg} alt="zoomed" className="zoom-image" />
        </div>
      )}
    </div>
  );
}
