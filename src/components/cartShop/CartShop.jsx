import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./CartShop.module.css";

//Context
import { CartContext } from "../../context/CartContextProvider";

//Components
import Cart from "../shared/cart/Cart";

const CartShop = () => {
  const { state, dispatch } = useContext(CartContext);

  return (
    <div className={styles.container}>
      <div className={styles.cartContainer}>
        {state.selectedItems.map((selectedItem) => (
          <Cart key={selectedItem.id} data={selectedItem} />
        ))}
      </div>
      {state.itemCounter > 0 && (
        <div className={styles.payments}>
          <p>
            <span>Total Items:</span> {state.itemCounter}
          </p>
          <p>
            <span>Total Payments:</span> {state.total}{" "}
          </p>
          <div className={styles.buttonContainer}>
            <button
              className={styles.clear}
              onClick={() => dispatch({ type: "CLEAR" })}
            >
              Clear
            </button>
            <button
              className={styles.checkout}
              onClick={() => dispatch({ type: "CHECKOUT" })}
            >
              Chekout
            </button>
          </div>
        </div>
      )}

      {state.checkout && (
        <div className={styles.complete}>
          <h3>Check Out Successfully!</h3>
          <Link to="/products">Buy More!</Link>
        </div>
      )}

      {!state.checkout && state.itemCounter === 0 && (
        <div className={styles.complete}>
          <h3>Want To Buy?</h3>
          <Link to="/products">Go To Shop!</Link>
        </div>
      )}
    </div>
  );
};

export default CartShop;
