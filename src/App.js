import { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import CartContext from "./Context/CartContext";
import MainPage from "./Pages/MainPage";
import ProductDescriptionPage from "./Pages/ProductDescriptionPage";
import CartPage from "./Pages/CartPage";

class App extends Component {
  setCurrency = (cur) => {
    this.setState({ currency: cur });
  };

  setCategory = (cat) => {
    this.setState({ category: cat });
  };

  setCartItems = (cartItemObject) => {
    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, cartItemObject],
    }));
  };

  increaseQuantity = (cartItemId) => {
    const foundCartItem = this.state.cartItems.find(
      (item) => item.id === cartItemId
    );
    const cartItems = [...this.state.cartItems];
    foundCartItem.quantity++;
    const index = cartItems.indexOf(foundCartItem);
    cartItems[index] = foundCartItem;
    this.setState({ cartItems: cartItems });
  };

  deleteCartItem = (cartItemId) => {
    console.log(cartItemId);
    const cartItems = [...this.state.cartItems];
    const newCartItemArray = cartItems.filter((item) => item.id !== cartItemId);
    this.setState({ cartItems: newCartItemArray });
  };

  decreaseQuantity = (cartItemId) => {
    const foundCartItem = this.state.cartItems.find(
      (item) => item.id === cartItemId
    );
    const cartItems = [...this.state.cartItems];
    foundCartItem.quantity--;
    const index = cartItems.indexOf(foundCartItem);
    if (foundCartItem.quantity <= 0) {
      this.deleteCartItem(cartItemId);
    }

    cartItems[index] = foundCartItem;
    if (foundCartItem.quantity <= 0) {
      this.deleteCartItem(cartItemId);
    } else {
      this.setState({ cartItems: cartItems });
    }
  };

  clearCart = () => {
    let cartItems = [...this.state.cartItems];
    cartItems = [];
    this.setState({ cartItems: cartItems });
  };

  state = {
    currency: "$",
    setCurrency: this.setCurrency,
    category: "all",
    setCategory: this.setCategory,
    cartItems: [],
    setCartItems: this.setCartItems,
    increaseQuantity: this.increaseQuantity,
    deleteCartItem: this.deleteCartItem,
    decreaseQuantity: this.decreaseQuantity,
    clearCart: this.clearCart,
  };

  render() {
    console.log(this.state.cartItems);
    return (
      <CartContext.Provider value={this.state}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/product/:id" element={<ProductDescriptionPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="*"
            element={<Link to={"/"}>Wrong Url. Navigate to main page!</Link>}
          />
        </Routes>
      </CartContext.Provider>
    );
  }
}

export default App;
