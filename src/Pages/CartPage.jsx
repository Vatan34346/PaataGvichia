import { Component, Fragment } from "react";
import Header from "../Components/Header/Header";
import CartList from "../Layouts/CartList/CartList";
import CartContext from "../Context/CartContext";

export default class CartPage extends Component {
  static contextType = CartContext;

  render() {
    const { cartItems } = this.context;

    return (
      <Fragment>
        <Header cartItems={cartItems} />
        <CartList />
      </Fragment>
    );
  }
}
