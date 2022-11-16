import { Component, Fragment } from "react";
import "./CartList.css";

import CartContext from "../../Context/CartContext";
import CartItem from "../../Components/CartItem/CartItem";
import { helperMethods } from "../../Utils/helpers";

export default class CartList extends Component {
  static contextType = CartContext;

  state = {
    cartItems: [],
    tax: 21,
  };

  hadleOrder = () => {
    alert("You successfully order products. Thank you!:)");
    this.context.clearCart();
  };

  render() {
    const { cartItems, currency } = this.context;
    const { tax } = this.state;
    let itemCount = cartItems.length;

    const { sumToShow, symbolToShow } = helperMethods.countAmount(
      cartItems,
      currency
    );

    return (
      <Fragment>
        {cartItems.length !== 0 && <p className="cartTitle">Cart</p>}
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

            return <CartItem key={index} cartItemInfo={cartItemInfo} />;
          })}
        {cartItems.length === 0 && <p className="empty">Cart is empty</p>}
        {cartItems.length !== 0 && (
          <div className="cartItemsStats">
            <p className="statsInfo">
              Tax {tax}% &nbsp;{symbolToShow}
              {(sumToShow / 100) * tax}
            </p>
            <p className="statsInfo">Quantity &nbsp;{itemCount}</p>
            <p className="statsInfo">
              Total &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{symbolToShow}
              {sumToShow}
            </p>
          </div>
        )}

        {cartItems.length !== 0 && (
          <div
            className="order"
            onClick={() => {
              this.hadleOrder();
            }}
          >
            <p>Order</p>
          </div>
        )}
      </Fragment>
    );
  }
}
