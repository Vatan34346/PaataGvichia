import { Component } from "react";
import CartContext from "../../Context/CartContext";

import "./Product.css";

import { endpoint } from "../../Api/endpointApi";
import { fetchData } from "../../Api/fetch";
import { Schems } from "../../Api/schems";
import { helperMethods } from "../../Utils/helpers";

class Product extends Component {
  static contextType = CartContext;

  state = {
    id: "",
    itemIsadd: false,
    activePicId: "",
    activeSizeId: "",
    activeColorId: "",
    activeUsbId: "",
    activeCapacityId: "",
    activeTouchId: "",
    capacity: [],
    size: [],
    pictures: [],
    name: "",
    inStock: true,
    brand: "",
    colors: [],
    defaultPic: "",
    description: "",
    attributes: [],
    prices: [],
    usbQuestions: [],
    touchQuestions: [],
  };

  componentDidMount() {
    fetchData(Schems.PRODUCT(this.getIdFromUrl()), endpoint.graphQL).then(
      (data) => {
        console.log(data);
        if (data) {
          this.setState({
            id: data.data.product.id,
            pictures: data.data.product.gallery,
            defaultPic: data.data.product.gallery[0],
            name: data.data.product.name,
            brand: data.data.product.brand,
            description: helperMethods.toPlainText(
              data.data.product.description
            ),
            inStock: data.data.product.inStock,
            size: helperMethods
              .handleAttribute(data.data.product.attributes)
              .get("Size"),
            prices: data.data.product.prices,
            colors: helperMethods
              .handleAttribute(data.data.product.attributes)
              .get("Color"),
            capacity: helperMethods
              .handleAttribute(data.data.product.attributes)
              .get("Capacity"),
            usbQuestions: helperMethods
              .handleAttribute(data.data.product.attributes)
              .get("With USB 3 ports"),
            touchQuestions: helperMethods
              .handleAttribute(data.data.product.attributes)
              .get("Touch ID in keyboard"),
          });
        }
      }
    );
  }

  clickedImg = (e) => {
    console.log(e);
    this.setState({ defaultPic: e.target.currentSrc });
    const activatedElement = this.state.pictures.find(
      (item) => item === e.target.currentSrc
    );
    activatedElement && this.setState({ activePicId: e.target.currentSrc });
  };

  clickedSize = (id) => {
    const activeSize = this.state.size.find((s) => s.id === id);
    activeSize && this.setState({ activeSizeId: id });
  };

  clickedColor = (id) => {
    const activeColor = this.state.colors.find((c) => c.id === id);
    activeColor && this.setState({ activeColorId: id });
  };

  clickedCapacity = (id) => {
    const activeCapacity = this.state.capacity.find((c) => c.id === id);
    activeCapacity && this.setState({ activeCapacityId: id });
  };

  clickedUsbAnswer = (id) => {
    const usbAnswer = this.state.usbQuestions.find((u) => u.id === id);
    usbAnswer && this.setState({ activeUsbId: id });
  };

  clickedTouchAnswer = (id) => {
    const touchAnswer = this.state.touchQuestions.find((t) => t.id === id);
    touchAnswer && this.setState({ activeTouchId: id });
  };

  getIdFromUrl = () => {
    const pathName = window.location.pathname;
    const splitPath = pathName.split("/");
    const id = splitPath[splitPath.length - 1];
    return id;
  };

  addToCart = (id) => {
    const cartItem = {
      ...this.state,
      quantity: 1,
    };
    this.context.setCartItems(cartItem);
    console.log(cartItem);
    this.handleAddOrRemoveCartItem();
  };

  deleteFromCart = (id) => {
    this.context.deleteCartItem(id);
    this.handleAddOrRemoveCartItem();
  };

  handleAddOrRemoveCartItem = () => {
    this.setState((prevState) => ({
      itemIsadd: !prevState.itemIsadd,
    }));
  };

  render() {
    const { cartItems } = this.context;
    const existingInCart = cartItems.find((item) => item.id === this.state.id);
    const {
      itemIsadd,
      activePicId,
      activeSizeId,
      activeColorId,
      activeCapacityId,
      activeUsbId,
      activeTouchId,
      pictures,
      defaultPic,
      name,
      brand,
      description,
      inStock,
      prices,
      size,
      colors,
      capacity,
      usbQuestions,
      touchQuestions,
    } = this.state;

    const { amount, symbol } = helperMethods.setCurrencyValues({
      currency: this.context.currency,
      prices: prices,
    });

    const addOrRemove =
      itemIsadd && existingInCart !== undefined ? (
        <button
          onClick={() => {
            this.deleteFromCart(this.state.id);
          }}
          className="addButton"
        >
          <p className="buttonText">Remove from Cart</p>
        </button>
      ) : (
        <button
          onClick={() => this.addToCart(this.state.id)}
          className="addButton"
        >
          <p className="buttonText">Add to Cart</p>
        </button>
      );

    return (
      <div className="container">
        <div className="pictureVariants">
          {pictures.map((item, index) => (
            <img
              onClick={this.clickedImg.bind(this)}
              className={
                item === activePicId
                  ? "hightlightedPictureVariant"
                  : "pictureVariant"
              }
              key={index}
              src={item}
              alt="alt"
            />
          ))}
        </div>

        <div className="mainePicture">
          <img className="picture" src={defaultPic} alt="alt" />
        </div>

        <div className="productInfo">
          <div className="titleContainer">
            <p className="productTitle">{name}</p>
            <p className="subTitle"> {brand}</p>
          </div>

          {size && (
            <div className="attributeContainer">
              <p className="attributeTitle">Size</p>
              <div className="attributeOutput">
                {size.map((s, index) => (
                  <p
                    key={index}
                    onClick={() => this.clickedSize(s.id)}
                    className={
                      activeSizeId === s.id
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

          {colors && (
            <div className="attributeContainer">
              <p className="attributeTitle">Color</p>
              <div className="attributeOutput">
                {colors.map((c, index) => (
                  <p
                    key={index}
                    onClick={() => this.clickedColor(c.id)}
                    style={
                      activeColorId === c.id
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

          {capacity && (
            <div className="attributeContainer">
              <p className="attributeTitle">Capacity</p>
              <div className="attributeOutput">
                {capacity.map((c, index) => (
                  <p
                    key={index}
                    onClick={() => this.clickedCapacity(c.id)}
                    className={
                      activeCapacityId === c.id
                        ? "attributeItemActivated"
                        : "attributeItem"
                    }
                  >
                    {c.value}
                  </p>
                ))}
              </div>
            </div>
          )}

          {usbQuestions && (
            <div className="attributeContainer">
              <p className="attributeTitle">With USB 3 ports</p>
              <div className="attributeOutput">
                {usbQuestions.map((u, index) => (
                  <p
                    key={index}
                    onClick={() => this.clickedUsbAnswer(u.id)}
                    className={
                      activeUsbId === u.id
                        ? "attributeItemActivated"
                        : "attributeItem"
                    }
                  >
                    {u.value}
                  </p>
                ))}
              </div>
            </div>
          )}

          {touchQuestions && (
            <div className="attributeContainer">
              <p className="attributeTitle">Touch ID in keyboard</p>
              <div className="attributeOutput">
                {usbQuestions.map((t, index) => (
                  <p
                    key={index}
                    onClick={() => this.clickedTouchAnswer(t.id)}
                    className={
                      activeTouchId === t.id
                        ? "attributeItemActivated"
                        : "attributeItem"
                    }
                  >
                    {t.value}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="priceComtainer">
            <p className="priceTitle">Price</p>

            <p className="priceValue">
              {amount} {symbol}
            </p>
          </div>
          {inStock ? (
            addOrRemove
          ) : (
            <div className="decription">Not In Stock</div>
          )}
          <div className="decription">
            <p className="descriptionText">{description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
