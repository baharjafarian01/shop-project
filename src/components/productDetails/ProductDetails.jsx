import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styles from "./ProductDetails.module.css";

const ProductDetails = () => {
  const [state, setState] = useState([]);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchApi = async () => {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setState(response.data);
    };
    fetchApi();
  }, []);

  return (
    <div className={styles.container}>
      <img className={styles.image} src={state.image} alt="product" />
      <div className={styles.textContainer}>
        <h3>{state.title}</h3>
        <p className={styles.description}>{state.description}</p>
        <p className={styles.category}>
          <span>Category:</span> {state.category}
        </p>
        <div className={styles.buttonContainer}>
          <span className={styles.price}>{state.price} $</span>
          <Link to="/products">Back to Shop</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
