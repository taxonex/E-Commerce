import { useState } from "react";
import "./css/header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">NewLo(Shop)</div>

        {/* Hamburger (Mobile) */}
        <div 
          className="hamburger" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        {/* Navigation */}
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>

        {/* Cart Button */}
        <div className="cart">
          <button className="cart-btn">🛒 Cart (0)</button>
        </div>
      </div>
    </header>
  );
}
