import { Component, Fragment } from "react";

import Header from "../Components/Header/Header";
import Product from "../Components/Product/Product";
import CartContext from "../Context/CartContext";

export default class ProductDescriptionPage extends Component {
  static contextType = CartContext;

  render() {
    const { cartItems } = this.context;

    return (
      <Fragment>
        <Header cartItems={cartItems} />
        <Product />
      </Fragment>
    );
  }
}
