import { Component } from "react";
import { Navigate } from "react-router-dom";

import CartContext from "../../Context/CartContext";
import { helperMethods } from "../../Utils/helpers";

import "./ProductCard.css";

export default class ProductCard extends Component {
  static contextType = CartContext;
  state = {
    shouldRedirect: false,
  };

  redirectHandler = () => {
    this.setState({ shouldRedirect: true });
  };

  render = () => {
    const { cartItems } = this.context;
    const { id, pic, inStock, productName } = this.props;
    const { symbol, amount } = helperMethods.setCurrencyValues(this.props);
    const existsInCart = cartItems.find((item) => item.id === id);

    return (
      <div className="cardContainer" onClick={this.redirectHandler}>
        {this.state.shouldRedirect && (
          <Navigate to={`/product/${this.props.id}`} />
        )}
        {!inStock && (
          <div className="cardPicture">
            <img className="cardPicNotInStock" src={pic} alt="sweater" />

            <p className="notInStockText">Not in Stock</p>
          </div>
        )}
        {inStock && (
          <div className="cardPicture">
            <img className="cardPic" src={pic} alt="sweater" />

            {existsInCart !== undefined && (
              <img
                className="carIndicatorPic"
                src="https://image.shutterstock.com/image-vector/shopping-cart-icon-flat-design-260nw-570153007.jpg"
                alt="test"
              />
            )}
          </div>
        )}
        <p className="cardProductName">{productName}</p>
        <p className="cardProductPrice">
          {symbol}
          {amount}
        </p>
      </div>
    );
  };
}
