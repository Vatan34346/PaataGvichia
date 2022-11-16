import { Component } from "react";

import CartContext from "../../Context/CartContext";
import { helperMethods } from "../../Utils/helpers";

import "./ModalCartItem.css";

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
    const { increaseQuantity, decreaseQuantity } = this.context;
    const { pictureIndex } = this.state;
    const { cartItemInfo } = this.props;

    const { symbol, amount } = helperMethods.setCurrencyValues({
      currency: this.context.currency,
      prices: cartItemInfo.prices,
    });

    const cartItems = (
      <div className="modalCartContainer">
        <div className="modalCartInfo">
          <p className="modalProductTitle">{cartItemInfo.name}</p>
          <p className="modalSubTitle">{cartItemInfo.brand}</p>
          <p className="modalCartPriceValue">
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

        <div className="modalControlls_pic_containet">
          <div className="modalControlls">
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

          <div className="modalPicContainer">
            <img
              className="modalPic"
              src={cartItemInfo.pictures[pictureIndex - 1]}
              alt=""
            />

            <img
              className="modalLeftArrow"
              onClick={() => this.pictureIncreementHandler("-")}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8eIB0ABwAABQAAAACfn56jpKIbHRrDw8MZHBjMzMzAwcAbHhrExcQDCQDS0tIVGBQKDgi4ubjl5eVxcnEQEw/29vbe396ur66YmJdeX13Z2di1trUlJyRRUlFlZmRERkQ5Ozg0NjN4eXhTVFLuQuL+AAADfUlEQVR4nO2dbU/bQBCE/XLFdvxSO06CAwQI9P//xiaASiDjVqrOWt3cPN8jzeh2vbt3ji9JhBBCCCGEEEIIIYQQQgghhBBC/AfjtN9Po7WK5Rg3znWdc3f31koWYlUN6Rtb92CtZRFKV6QfFK60VrMA9afBNK0OO2s93qmzC4Np6iZrQb5p3ReDaf9orcgz3w2eFtFakl/qK4NkDr/l4NvTdLAW5ZPyegXT7ZO1Ko8gg6mrrWX5o86Bwf7ZWpY/StdcG6yGW2td3oAhWnU/rXV5A5SJ8wqurHV5A5QJLoMwRIucx+B1q3ZeQaccDIYyQ2WiIzLIXiawwZzHIH2ZaFGrVjgegzhEM6IQZS8T9DmIW7WM3KBatYAoc7VqYYNDlMkge5mAAy9Tq4YnerVq4UCfg2rVQqeGnQxViCKDRBu/atVCJ9IyQd+qMW38qlULHJyD9FsWTDmI3pOptkwrqMOXsFGZCB3692T4J3r2HNThS+jgEGWqg+xlgv7wRa1a6NDnoA5fQqeGA++BxyCc6NP+6eZHwEzt7sIgCNGzxSxknHOb8e8Gw2d4LwX3AwpRDqrh/Cg59tY6FqQ/JsnaWatYFLdONsxLeFrETfLC+ph5p3hJrCUszYF+DY/JZmstYlG2r/TP0pK8Hm4f33oa3kzs+1vqvrTpio/5D+6xpefZIg+Y02zx+md+atGR9mk+nG4C5qG9/JRTiSwWKc+MH8FmcBwWO7QZRXSsFsE7UHEEKn5NqLXW5ZGyQ6s4MFmMIlD5LaJDNrJcxEWDyWIMgYosNlyBCotGRmURByqTxZlA5cpF/gYO1cWGKhcjeKLO1EUqi+ijcw3V99bhm25NzmQxhkDFFom+gzzTwHFZxKvIlYuwu4nAIlOgwj9bcllU0WCghMc2VBZhA8dlcSZQVTSCoo62gWOyGEHRaNFfaAu3ttblkZmiwWQxhkDFm4xMqzhTNKgsKhcJgA0cWS7CYxsqi7CBa8gClX8V8bENk0V8bENlcaZoyGJQzDRwTLdyx9vAcVmEUz/TX1HwXbJHa1k+wfcBM8UpvtP5zlqVV9C93J21KL/Q360OikbD5vDKYv/LWpF3vuWim6wF+edLLlaH3b9/ERwXRYPr4PSTVTN8FMOMabq4ZNw413XO3d1bK1mOcdrvp9FahRBCCCGEEEIIIYQQQgghhBBCRMtv7PxEggm3iH4AAAAASUVORK5CYII="
              alt="test"
            />
            <img
              className="modalRightArrow"
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
