import { useReducer, createContext } from "react";

const initialState = {
  selectedItems: [],
  itemCounter: 0,
  total: 0,
  checkout: false,
};
if (localStorage.getItem("cart")) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  initialState.selectedItems = cart;
  initialState.itemCounter = cart.reduce(
    (sum, selectedItem) => sum + selectedItem.quantity,
    0
  );
  initialState.total = cart.reduce(
    (sum, selectedItem) => sum + selectedItem.price * selectedItem.quantity,
    0
  );
}
const sumItems = (selectedItems) => {
  const itemCounter = selectedItems.reduce(
    (sum, selectedItem) => sum + selectedItem.quantity,
    0
  );
  const total = selectedItems
    .reduce(
      (sum, selectedItem) => sum + selectedItem.price * selectedItem.quantity,
      0
    )
    .toFixed(2);
  return { itemCounter, total };
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (
        !state.selectedItems.find(
          (selectedItem) => selectedItem.id === action.payload.id
        )
      ) {
        state.selectedItems.push({
          ...action.payload,
          quantity: 1,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.selectedItems));
      return {
        ...state,
        selectedItems: [...state.selectedItems],
        ...sumItems(state.selectedItems),
        checkout: false,
      };

    case "REMOVE_ITEM":
      const newSelectedItems = state.selectedItems.filter(
        (selectedItem) => selectedItem.id !== action.payload.id
      );
      localStorage.setItem("cart", JSON.stringify(newSelectedItems));

      return {
        ...state,
        selectedItems: [...newSelectedItems],
        ...sumItems(newSelectedItems),
      };

    case "INCREASE":
      const indexI = state.selectedItems.findIndex(
        (selectedItem) => selectedItem.id === action.payload.id
      );
      state.selectedItems[indexI].quantity++;
      localStorage.setItem("cart", JSON.stringify(state.selectedItems));
      return {
        ...state,
        ...sumItems(state.selectedItems),
      };

    case "DECREASE":
      const indexD = state.selectedItems.findIndex(
        (selectedItem) => selectedItem.id === action.payload.id
      );
      state.selectedItems[indexD].quantity--;
      localStorage.setItem("cart", JSON.stringify(state.selectedItems));
      return {
        ...state,
        ...sumItems(state.selectedItems),
      };

    case "CHECKOUT":
      return {
        selectedItems: [],
        itemCounter: 0,
        total: 0,
        checkout: true,
      };

    case "CLEAR":
      localStorage.removeItem("cart");
      console.log("cartCLEAR", localStorage.getItem("cart"));
      return {
        selectedItems: [],
        itemCounter: 0,
        total: 0,
        checkout: false,
      };

    default:
      return state;
  }
};

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
