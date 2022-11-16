import { Component } from "react";

import CartContext from "../../Context/CartContext";
import { helperMethods } from "../../Utils/helpers";

import "./CartItem.css";

export default class CartItem extends Component {
  static contextType = CartContext;

  state = {
    pictureIndex: 1,
    picArrayLength: 0,
  };

  componentDidMount() {
    this.setState({
      picArrayLength: this.props.cartItemInfo.pictures.length,
    });
  }

  pictureIncreementHandler = (action) => {
    const { picArrayLength } = this.state;
    switch (action) {
      case "-":
        this.setState((prevState) => ({
          pictureIndex:
            prevState.pictureIndex <= 1
              ? picArrayLength
              : prevState.pictureIndex - 1,
        }));
        break;
      case "+":
        this.setState((prevState) => ({
          pictureIndex:
            prevState.pictureIndex >= picArrayLength
              ? 1
              : prevState.pictureIndex + 1,
        }));
        break;
      default:
        break;
    }
  };

  render() {
    const { increaseQuantity, deleteCartItem, decreaseQuantity } = this.context;
    const { pictureIndex } = this.state;
    const { cartItemInfo } = this.props;

    const { symbol, amount } = helperMethods.setCurrencyValues({
      currency: this.context.currency,
      prices: cartItemInfo.prices,
    });

    console.log(cartItemInfo);
    const cartItems = (
      <div className="cartContainer">
        <img
          onClick={() => deleteCartItem(cartItemInfo.id)}
          className="deleteCartIcon"
          src="data:image/png;base64,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"
          alt=""
        />
        <div className="cartInfo">
          <p className="productTitle">{cartItemInfo.name}</p>
          <p className="subTitle">{cartItemInfo.brand}</p>
          <p className="cartPriceValue">
            {amount} {symbol}
          </p>

          {cartItemInfo.size && (
            <div className="attributeContainer">
              <p className="attributeTitle">Size</p>
              <div className="attributeOutput">
                {cartItemInfo.size.map((s, index) => (
                  <p
                    key={index}
                    className={
                      cartItemInfo.activeSizeId === s.id
                        ? "attributeItemActivated"
                        : "attributeItem"
                    }
                  >
                    {s.value}
                  </p>
                ))}
              </div>
            </div>
          )}

          {cartItemInfo.colors && (
            <div className="attributeContainer">
              <p className="attributeTitle">Color</p>
              <div className="attributeOutput">
                {cartItemInfo.colors.map((c, index) => (
                  <p
                    key={index}
                    style={
                      cartItemInfo.activeColorId === c.id
                        ? {
                            padding: "0.5rem",
                            paddingLleft: "1rem",
                            paddingRight: "1rem",
                            border: "3px solid black",
                            margin: "0",
                            marginRight: "2%",
                            background: `${c.value}`,
                          }
                        : {
                            padding: "0.5rem",
                            paddingLleft: "1rem",
                            paddingRight: "1rem",
                            border: "1px solid black",
                            margin: "0",
                            marginRight: "2%",
                            background: `${c.value}`,
                          }
                    }
                  ></p>
                ))}
              </div>
            </div>
          )}

          {cartItemInfo.capacity && (
            <div className="attributeContainer">
              <p className="attributeTitle">Capacity</p>
              <div className="attributeOutput">
                {cartItemInfo.capacity.map((s, index) => (
                  <p
                    key={index}
                    className={
                      cartItemInfo.activeCapacityId === s.id
                        ? "attributeItemActivated"
                        : "attributeItem"
                    }
                  >
                    {s.value}
                  </p>
                ))}
              </div>
            </div>
          )}

          {cartItemInfo.usbQuestions && (
            <div className="attributeContainer">
              <p className="attributeTitle">With USB 3 ports</p>
              <div className="attributeOutput">
                {cartItemInfo.usbQuestions.map((s, index) => (
                  <p
                    key={index}
                    className={
                      cartItemInfo.activeUsbId === s.id
                        ? "attributeItemActivated"
                        : "attributeItem"
                    }
                  >
                    {s.value}
                  </p>
                ))}
              </div>
            </div>
          )}

          {cartItemInfo.touchQuestions && (
            <div className="attributeContainer">
              <p className="attributeTitle">Touch ID in keyboard</p>
              <div className="attributeOutput">
                {cartItemInfo.touchQuestions.map((s, index) => (
                  <p
                    key={index}
                    className={
                      cartItemInfo.activeTouchId === s.id
                        ? "attributeItemActivated"
                        : "attributeItem"
                    }
                  >
                    {s.value}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="controlls_pic_containet">
          <div className="controlls">
            <button
              onClick={() => {
                increaseQuantity(cartItemInfo.id);
              }}
            >
              +
            </button>

            <input min={1} value={cartItemInfo.quantity} disabled type="text" />
            <button
              onClick={() => {
                decreaseQuantity(cartItemInfo.id);
              }}
            >
              -
            </button>
          </div>

          <div className="picContainer">
            <img
              className="pic"
              src={cartItemInfo.pictures[pictureIndex - 1]}
              alt=""
            />

            <img
              className="leftArrow"
              onClick={() => this.pictureIncreementHandler("-")}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8eIB0ABwAABQAAAACfn56jpKIbHRrDw8MZHBjMzMzAwcAbHhrExcQDCQDS0tIVGBQKDgi4ubjl5eVxcnEQEw/29vbe396ur66YmJdeX13Z2di1trUlJyRRUlFlZmRERkQ5Ozg0NjN4eXhTVFLuQuL+AAADfUlEQVR4nO2dbU/bQBCE/XLFdvxSO06CAwQI9P//xiaASiDjVqrOWt3cPN8jzeh2vbt3ji9JhBBCCCGEEEIIIYQQQgghhBBC/AfjtN9Po7WK5Rg3znWdc3f31koWYlUN6Rtb92CtZRFKV6QfFK60VrMA9afBNK0OO2s93qmzC4Np6iZrQb5p3ReDaf9orcgz3w2eFtFakl/qK4NkDr/l4NvTdLAW5ZPyegXT7ZO1Ko8gg6mrrWX5o86Bwf7ZWpY/StdcG6yGW2td3oAhWnU/rXV5A5SJ8wqurHV5A5QJLoMwRIucx+B1q3ZeQaccDIYyQ2WiIzLIXiawwZzHIH2ZaFGrVjgegzhEM6IQZS8T9DmIW7WM3KBatYAoc7VqYYNDlMkge5mAAy9Tq4YnerVq4UCfg2rVQqeGnQxViCKDRBu/atVCJ9IyQd+qMW38qlULHJyD9FsWTDmI3pOptkwrqMOXsFGZCB3692T4J3r2HNThS+jgEGWqg+xlgv7wRa1a6NDnoA5fQqeGA++BxyCc6NP+6eZHwEzt7sIgCNGzxSxknHOb8e8Gw2d4LwX3AwpRDqrh/Cg59tY6FqQ/JsnaWatYFLdONsxLeFrETfLC+ph5p3hJrCUszYF+DY/JZmstYlG2r/TP0pK8Hm4f33oa3kzs+1vqvrTpio/5D+6xpefZIg+Y02zx+md+atGR9mk+nG4C5qG9/JRTiSwWKc+MH8FmcBwWO7QZRXSsFsE7UHEEKn5NqLXW5ZGyQ6s4MFmMIlD5LaJDNrJcxEWDyWIMgYosNlyBCotGRmURByqTxZlA5cpF/gYO1cWGKhcjeKLO1EUqi+ijcw3V99bhm25NzmQxhkDFFom+gzzTwHFZxKvIlYuwu4nAIlOgwj9bcllU0WCghMc2VBZhA8dlcSZQVTSCoo62gWOyGEHRaNFfaAu3ttblkZmiwWQxhkDFm4xMqzhTNKgsKhcJgA0cWS7CYxsqi7CBa8gClX8V8bENk0V8bENlcaZoyGJQzDRwTLdyx9vAcVmEUz/TX1HwXbJHa1k+wfcBM8UpvtP5zlqVV9C93J21KL/Q360OikbD5vDKYv/LWpF3vuWim6wF+edLLlaH3b9/ERwXRYPr4PSTVTN8FMOMabq4ZNw413XO3d1bK1mOcdrvp9FahRBCCCGEEEIIIYQQQgghhBBCRMtv7PxEggm3iH4AAAAASUVORK5CYII="
              alt="test"
            />
            <img
              className="rightArrow"
              onClick={() => this.pictureIncreementHandler("+")}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEX///8eIB0AAAAABQAABwCfn56jpKIbHRoZGxjR0dG9vr3Nzc3S0tIRFA/CwsIcHxt1dnUTFRGwsK+pqqm2t7bf39+XmJfq6upQUU8iJCAqLCkKDgdFRkQ3OTby8/Ly8vFcXVtpaWg6Ozkgv1bJAAADLElEQVR4nO2d0XKbMBREhaCGmITYEOPYOE6T///IOqmnhXL1VobR0Z5nP2hHe3VXIGTnhBBCCCGEEEIIIYQQQgghhBBCrMOh6/v2uPYolqN+9X4ovN9RNW78PvtmOD2uPZZFaH2Z3an8w9qjWYBj/kdglpVEiX2ejaie6rUH9N85l9lEYoGrRZ9NKT1M4vVfhVlZwIw6U3irRdZyc6nmElkrajefRFjTuJ7nk5iVqKbx4Mu5xGogzWJjSWQ1ja0tkWRUUyIrwNkSc5JRk63FgW9UVIALrKgkiYFaJEm0ZzGBpjGQVtRkm0bONyq/aVQooyZbiwpwcZGAUVMNcNWeX4sKcHFhNw3Ua5tALfKXG5RRU20a2vVHRrJNg1+LKTQN1LmbZGtRu/64UIAjEAhweIkKcJEReG3DN2oCAQ5l1GRrEXWSMRDgSLOYgFFTDXApNA0FuLhItmkkUIsooyZQi031bEic7Prfm/ZHxHQ/je+JxgHu+OG9L2LGEjgyauMH8wfxcw9wtVWnEKrqcFP4Zk8xg/3FuRfju0YQfus+9msPYlH2O/dmtBIQ5Zs7rT2GZXk+uU/uSvrFbQ53T2sPYlFudbjFr6XuQl5Mv/qhexy4Lf93pnF1wc2l9WhvkcdMaG/xd4d4bdpNxAT2h6DHUY0lkHTKZuuthxigh/umQNLNNi/0iybwnyrgj9XaFgW9ezIFkk7w4y/ssWcQX4OgM4r2DKKiWpIWxQsEtYnAKooXSLcoaEePj2ppWhQvkNQmWnpUw1vUnMEK9CGJLRBUg4pqsWNbFBTV1CZix7YoXiCoTdg1CHr5YgvEW7SACyTt6AMWxQuEW5QU1Tp6VGvp52Q6+jkZ06KkqGbOIOlOdnybsGsQ1Sbm+mBRzRJItyheIOmcjF2DoKhmC0RZ1BBIevliCwS1iYBF8QI5FjXvtyBFtevJ+i9ZUJtwG/z/AX/Op5Al0PxfbpBFnXtP77/VYRa9cZ72CtLLlzt9Dq7Bb455ObYoT+Dk+Rrpwe+Yjb/ffjCcOF+fTalfvR8K73fHtUeyHIeu71uwPiGEEEIIIYQQQgghhBBCCCGEWJJfMX9FR2FQhKYAAAAASUVORK5CYII="
              alt="test"
            />
          </div>
        </div>
      </div>
    );
    return cartItems;
  }
}
