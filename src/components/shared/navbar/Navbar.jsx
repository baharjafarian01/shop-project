import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

//Context
import { CartContext } from "../../../context/CartContextProvider";

//Icons
import shopIcon from "../../../assets/icons/shop.svg";

const Navbar = () => {
  const { state } = useContext(CartContext);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.linkContainer}>
          <Link to="/products" className={styles.topLink}>
            Products
          </Link>
          <Link to="/signup" className={styles.topLink}>
            Sign Up
          </Link>
        </div>
        <div className={styles.iconContainer}>
          <Link to="/cart">
            <img src={shopIcon} alt="shop" />
          </Link>
          <span>{state.itemCounter}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
