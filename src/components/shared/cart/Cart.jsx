import {useContext} from 'react';
import styles from './Cart.module.css'

//Context
import { CartContext } from '../../../context/CartContextProvider';

//Icons
import trashIcon from '../../../assets/icons/trash.svg'

//Functions
import { shorten } from '../../../helper/functions';

const Cart = (props) => {
    const {dispatch} = useContext(CartContext);
    const {image, price, quantity, title} = props.data


  return (
    <div className={styles.container}>
        <img className={styles.productImage} src={image} alt="product" />
        <div className={styles.data}>
            <h3>{shorten(title)}</h3>
            <p><span>Price:</span> {price}$</p>
        </div>
        <div className={styles.quantity}> 
            <span>{quantity}</span>
        </div>
        <div className={styles.buttonContainer}>
        {
            quantity > 1 ? <button onClick={()=> dispatch({type: "DECREASE", payload: props.data})}>-</button> :
            <button onClick={()=> dispatch({type: 'REMOVE_ITEM', payload: props.data})}><img src={trashIcon} alt='trash' style={{width: '20px'}} /></button>
        }
            <button onClick={()=> dispatch({type:"INCREASE", payload: props.data})}>+</button>
        </div>

       
    </div>
  )
}

export default Cart