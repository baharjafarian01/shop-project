import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

//Context
import ProductContextProvider from "./context/ProductContextProvider";
import CartContextProvider from "./context/CartContextProvider";

//Components
import Store from "./components/store/Store";
import ProductDetails from "./components/productDetails/ProductDetails";
import Navbar from "./components/shared/navbar/Navbar";
import CartShop from "./components/cartShop/CartShop";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";
import Footer from "./components/shared/footer/Footer";
import ScrollToTop from "./components/shared/ScrollToTop";

function App() {
  return (
    <ProductContextProvider>
      <CartContextProvider>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Store />} />
          <Route path="/cart" element={<CartShop />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="/*" element={<Navigate to="/products" />} />
        </Routes>
        <Footer />
      </CartContextProvider>
    </ProductContextProvider>
  );
}

export default App;
