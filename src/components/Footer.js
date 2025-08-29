import React from "react";
import "./css/Footer.css";

export default function Footer({
  brand = "Shoply",
  tagline = "Simple • Fast • Secure",
  email = "support@shoply.com",
  phone = "+91 90000 00000",
  address = "123 Market Street, Mumbai, IN 400001",
  devName = "rohit sahani",
  devLink = "https://myportfolio-rohit.vercel.app/",
  year = new Date().getFullYear(),
  linksShop = [
    { label: "Home", href: "/" },
    { label: "All Products", href: "/shop" },
    { label: "New Arrivals", href: "/category/new" },
    { label: "Deals", href: "/deals" },
  ],
  linksCompany = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy", href: "/privacy" },
  ],
  socials = [
    { label: "🌐 Website", href: "/" },
    { label: "🐙 GitHub", href: "https://github.com/" },
    { label: "💼 LinkedIn", href: "https://linkedin.com/" },
  ],
}) {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-section">
          <div className="footer-brand">
            <div className="footer-logo">{brand.slice(0, 1)}</div>
            <div>
              <h3>{brand}</h3>
              <p className="tagline">{tagline}</p>
            </div>
          </div>
          <p className="footer-text">
            Your one-stop shop for essentials. Clean design, faster checkout, and
            better shopping.
          </p>
        </div>

        {/* Shop Links */}
        <div className="footer-section">
          <h4>Shop</h4>
          <ul>
            {linksShop.map((item, i) => (
              <Li key={i} href={item.href}>{item.label}</Li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            {linksCompany.map((item, i) => (
              <Li key={i} href={item.href}>{item.label}</Li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li>📧 <a href={`mailto:${email}`}>{email}</a></li>
            <li>📞 <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a></li>
            <li>📍 <address>{address}</address></li>
          </ul>
          <div className="footer-socials">
            {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} {brand}. All rights reserved.</p>
        <p>
          Built by <a href={devLink} target="_blank" rel="noreferrer noopener">{devName}</a>
        </p>
      </div>
    </footer>
  );
}

function Li({ href, children }) {
  return (
    <li>
      <a href={href}>{children}</a>
    </li>
  );
}
