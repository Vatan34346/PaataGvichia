import { Component } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../Context/CartContext";
import ModalCartItem from "../../Components/ModalCartItem/ModalCartItem";
import { helperMethods } from "../../Utils/helpers";

import "./ModalCartList.css";

export default class ModalCartList extends Component {
  static contextType = CartContext;

  state = {
    cartItems: [],
  };

  handleCheckOut = () => {
    alert("You successfully order products. Thank you!:)");
    this.context.clearCart();
  };

  render() {
    const { cartItems, currency } = this.context;
    let itemCount = cartItems.length;

    const { sumToShow, symbolToShow } = helperMethods.countAmount(
      cartItems,
      currency
    );

    return (
      <div
        className={
          cartItems.length === 0
            ? "emptyModalCartListContainer"
            : "modalCartListContainer"
        }
      >
        {cartItems.length !== 0 && (
          <div className="myBag">
            <p className="bagTitle">My Bag. {itemCount} items</p>
          </div>
        )}
        {cartItems &&
          cartItems.map((item, index) => {
            const cartItemInfo = {
              cartItemId: item.cartItemId,
              activeCapacityId: item.activeCapacityId,
              activeColorId: item.activeColorId,
              activeSizeId: item.activeSizeId,
              activeTouchId: item.activeTouchId,
              activeUsbId: item.activeUsbId,
              brand: item.brand,
              quantity: item.quantity,
              capacity: item.capacity,
              colors: item.colors,
              id: item.id,
              name: item.name,
              pictures: item.pictures,
              prices: item.prices,
              size: item.size,
              touchQuestions: item.touchQuestions,
              usbQuestions: item.usbQuestions,
            };

            return <ModalCartItem key={index} cartItemInfo={cartItemInfo} />;
          })}
        {cartItems.length !== 0 && (
          <div className="amount">
            <p className="amountText">Total</p>
            <p className="amountText">
              {symbolToShow}
              {sumToShow}
            </p>
          </div>
        )}
        {cartItems.length === 0 && <p className="empty">Cart is empty</p>}

        {cartItems.length !== 0 && (
          <div className="cartItemListControlls">
            <Link to={"/cart"} className="link">
              <div className="viewBag">
                <p>View Bag</p>
              </div>
            </Link>

            <div
              className="checkOut"
              onClick={() => {
                this.handleCheckOut();
              }}
            >
              <p>Check Out</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
