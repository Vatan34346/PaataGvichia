import { Component, Fragment } from "react";

import Header from "../Components/Header/Header";
import ProductList from "../Layouts/ProductList/ProductList";
import CartContext from "../Context/CartContext";

export default class MainPage extends Component {
  static contextType = CartContext;
  render() {
    const { cartItems } = this.context;

    return (
      <Fragment>
        <Header cartItems={cartItems} />
        <ProductList />
      </Fragment>
    );
  }
}
