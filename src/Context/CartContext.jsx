import React from "react";

const CartContext = React.createContext({
  currency: "$",
  setCurrency: () => {},
  category: "all",
  setCategory: () => {},
  cartItems: [],
  setCartItems: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  deleteCartItem: () => {},
  clearCart: () => {},
});

export default CartContext;
