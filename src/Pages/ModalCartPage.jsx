import { Component, Fragment } from "react";
import ModalCartList from "../Layouts/ModalCartList/ModalCartList";
import CartContext from "../Context/CartContext";

export default class CartPage extends Component {
  static contextType = CartContext;

  render() {
    return (
      <Fragment>
        <ModalCartList />
      </Fragment>
    );
  }
}
