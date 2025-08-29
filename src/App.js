// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';
// import Header from './components/Header';
// import BannerSlider from './components/BannerSlider';
// import ProductGrid from './components/ProductGrid';
// import Footer from './components/Footer';
// import HomeScreen from './pages/HomeScreen';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import Profile from './pages/Profile';
// import { AuthProvider } from './context/AuthContext';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Header />
//         <BannerSlider />
//         <ProductGrid />
//         {/* <ProductGrid /> */}
//         {/* <nav style={{ padding: "10px" }}>
//           <Link to="/">Home</Link> |{" "}
//           <Link to="/signup">Signup</Link> |{" "}
//           <Link to="/login">Login</Link> |{" "}
//           <Link to="/profile">Profile</Link>
//         </nav> */}

//         <main>
//           <Routes>
//             <Route path="/" element={<HomeScreen />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/profile" element={<Profile />} />
//           </Routes>
//         </main>
//         <Footer />
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import BannerSlider from './components/BannerSlider';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import HomeScreen from './pages/HomeScreen';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';
import ProductPage from './components/ProductPage';

function Layout() {
  const location = useLocation();

  // hide banner only on product detail page
  const hideBanner = location.pathname.startsWith("/product/");

  return (
    <>
      <Header />
      {!hideBanner && <BannerSlider />}

      <main style={{ minHeight: "70vh" }}>
        <Routes>
          {/* Homepage shows HomeScreen + ProductGrid category sliders */}
          <Route
            path="/"
            element={
              <>
                <HomeScreen />
                <ProductGrid /> 
              </>
            }
          />

          {/* Category Page → infinite scroll */}
          <Route path="/category/:categoryName" element={<ProductGrid />} />

          {/* Product Detail Page */}
          <Route path="/product/:categoryName/:productId" element={<ProductPage />} />

          {/* Auth Pages */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <Footer
      brand="NewLo Trading Hub"
      tagline="Quality. Value. Speed."
      email="help@NewLoshop.in"
      phone="+91 8512046520"
      address="I-89, vijjay vihar, phase-2, Rohini Sec-4, Dehli-110085"
      devName="Rohit Sahani"
      devLink="https://myportfolio-rohit.vercel.app/"
    />

    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;
