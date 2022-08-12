import { useContext, useState } from "react";
import styles from "./Store.module.css";

//Context
import { ProductsContext } from "../../context/ProductContextProvider";

//components
import Product from "../shared/product/Product";

const Store = () => {
  const products = useContext(ProductsContext);

  return (
    <div className={styles.container}>
      {products.map((product) => (
        <Product key={product.id} productData={product} />
      ))}
    </div>
  );
};

export default Store;
