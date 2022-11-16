import { Component } from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import Logo from "../../Materials/Logo.png";

import { fetchData } from "../../Api/fetch";
import { Schems } from "../../Api/schems";
import { endpoint } from "../../Api/endpointApi";
import CartContext from "../../Context/CartContext";
import ModalCartList from "../../Layouts/ModalCartList/ModalCartList";
import Modal from "../Modal/Modal";

export default class Header extends Component {
  static contextType = CartContext;
  state = {
    categories: [],
    currencies: [],
    modalIsHidden: false,
  };

  componentDidMount() {
    fetchData(Schems.CATEGORIES, endpoint.graphQL).then((cat) => {
      this.setState({ categories: cat.data.categories });
    });

    fetchData(Schems.CURRENCIES, endpoint.graphQL).then((cur) => {
      this.setState({ currencies: cur.data.currencies });
    });
  }

  showModal() {
    this.setState({ modalIsHidden: true });
  }

  hideModal() {
    this.setState({ modalIsHidden: false });
  }

  setCurrency = (e) => {
    this.context.setCurrency(e.target.value);
  };

  setCategory = (e) => {
    this.context.setCategory(e.target.innerHTML);
  };

  render() {
    const { categories, currencies, modalIsHidden } = this.state;
    const { cartItems } = this.props;
    const cartIcon = "";

    console.log(this.state.modalIsHidden);

    const cartIconWithITems = (
      <>
        <img
          className="cartIndicator"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANEAAAB6CAMAAAAWP0bwAAAAaVBMVEX///8NDQ0AAAD4+Pj8/PzY2NgJCQnc3NxTU1NoaGi9vb3n5+fj4+Pf39/V1dVgYGCcnJzJyck6Ojqtra1FRUV7e3vt7e22traVlZVMTEykpKQ0NDTPz88eHh5zc3MpKSkXFxeEhISNjY37b7nWAAAEEklEQVR4nO2c25aqMAxAIdQKgnIT8Aao//+Rh4Lj5chSkSbpzGI/zNOsNd2TNpQ01LLwEO2P3A/ms45lkOeIfw8V0f1cFZsqTGq4YNfb8BQtAubBfYnjF2FddibS7pCdV7mv4lz8aP8S4p374HKH7LyqYs49yAGk3rFX5o7GaZ+tuAf6GfOoPzZPsWp+bb3wuYf7luW5WTvvda6RWqcO95Bf4uzsj+JzjVMTqOTAPeoXxO6A+NwmX7a0hJF5zznbIAcE6BanZME99l5W5ZD59gCAZ+BeYie/FlJTb2tcJveGr6BHJUiN2kT47jcr6AGAs0F5XOxHBaiLkoSK2+NKUI9YQvdKniFR8tfjI3RRyrhdWvJmymkIUetkxMQLNEWoNZJw4p94rrYItU6w4xbKtAoppZhXKB37GHoCkiWn0HLcTqEPCS7jUnK22oUaIOLyEdYOQ8iGkq2msjqiGNkQcs27rY7NTw8qhbNsw1MkIfVqwfICqGs71wecOIwKPCEb9gzJwUkQjSRHBl9o3v78Z2TTpzvEVaSgD1JsIxslxPlbZLhCzbwraI2Wo2s/b42Iiw4pcoiUEu3hpoZy1jtUSZIOB2sDdG/kUhotCIwk0PkIq8KfdLQVByckMdrQGc0JEkOzkAjLkTHBMlKpge4tCae+8GRU052SYW+BfpTIjmeFS2RE9ox1kGpAT0ZkyY5ix9AakSU7MiOP6h1pRmVUUxnRPI7U8TnVKxLFPlUhJ6PJ6M6IRGgyGsGByAhKKiOfKnuvqZ5HdLugP2dE1iako/nsIyOyar7w/tobn7UhMaIsb2EeWN6g7Kc5HElqQYRtDZjH5HdGdPU6YXkkdW/Kw4kNiRFdAVJYK4rTFiBtpdHfV/dsRNt3QnA4QdzeecA+WW423rTdTjl2/pZwJhUS6BshKKk/38lr5J6TkLxpEPkoFui/V0R9NZcQ0rd1igpRibwrSAlZMWJ/nTqCZei9RVxJDCFSBGjTDhIWIcuKkJS4mvKF5eCcMKu2W67vSHGSAyRsH7fg7IUAOD9fxph3lA1OPQTa+9jZvyDVfcrMuIg61FdVOpVgz34HgND6VIIju5DipE0JIDbiRgNx1qQER+ZvYS8IS+gpSJoSoRYdSlCaESGFEKIYXZKE9cycCKmZV3x/E41CgmvYHXDCysfc3QJ2ZNS9LR0iOn4ZJnWjGPfo+5lvVZgGW4G6ZsK4AF1Ik6FhkgCeEfuEXpr/c+B9dnndLT4Q8d8D8pq82n/q1MRnzXZzwRDm0f6DQKkrBt3CwAvEenFit3wp1ejIMvNNn29XVN7Kd9laST1ZyfauzvC0MDW7vcA/pC70US1Wv2W29eAciszzQlcRet45nv/C2PQgHAX3KCYmJiYmJiYmJiY4+Qd9fz74kSIzfgAAAABJRU5ErkJggg=="
          alt=""
        />
        <p className="cartQuantity">{cartItems.length}</p>
      </>
    );

    return (
      <header className="headerContainer">
        <nav className="categoryContainer">
          {categories.map((item, index) => (
            <p
              className="category"
              onClick={this.setCategory.bind(this)}
              key={index}
            >
              <Link tabIndex={1} className="link" to={"/"}>
                {item.name}
              </Link>
            </p>
          ))}
        </nav>

        <div className="imgContainer">
          <img className="shopIcon" src={Logo} alt="test" />
        </div>

        <nav className="headerActions">
          <select
            value={this.state.chosenCurrency}
            onChange={this.setCurrency.bind(this)}
            className="action"
          >
            {currencies.map((item, index) => (
              <option value={item.symbol} key={index}>
                {item.symbol}

                {item.label}
              </option>
            ))}
          </select>

          <div className="cart">
            <img
              className="shopIcon"
              src="http://learnmongodbthehardway.com/images/originals/shopping_cart_racing.png"
              alt="test"
              onClick={this.showModal.bind(this)}
            />

            {modalIsHidden && (
              <Modal onClose={this.hideModal.bind(this)}>
                <ModalCartList />
              </Modal>
            )}
            {cartItems.length > 0 ? cartIconWithITems : cartIcon}
          </div>
        </nav>
      </header>
    );
  }
}
