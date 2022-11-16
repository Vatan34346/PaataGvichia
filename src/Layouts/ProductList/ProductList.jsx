import { Component } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";

import "./ProductList.css";

import CartContext from "../../Context/CartContext";
import { fetchData } from "../../Api/fetch";
import { Schems } from "../../Api/schems";
import { endpoint } from "../../Api/endpointApi";

export default class ProductList extends Component {
  static contextType = CartContext;

  state = {
    isLoading: true,
    products: [],
  };

  componentDidMount() {
    fetchData(Schems.PRODUCT_SCHEMA, endpoint.graphQL).then((data) => {
      this.setState({
        products: data.data.category.products,
        isLoading: false,
      });
    });
  }

  render = () => {
    const { products } = this.state;

    const showAllProducts = products.map((item, index) => (
      <ProductCard
        id={item.id}
        key={index}
        pic={item.gallery[0]}
        inStock={item.inStock}
        prices={item.prices}
        productName={item.name}
        currency={this.context.currency}
      />
    ));

    const showProductsByCAtegory = products.map((item, index) => {
      if (item.category === this.context.category) {
        return (
          <ProductCard
            id={item.id}
            key={index}
            pic={item.gallery[0]}
            inStock={item.inStock}
            prices={item.prices}
            productName={item.name}
            currency={this.context.currency}
          />
        );
      }
      return null;
    });

    return (
      <div className="listContainer">
        <div className="categoryNameContainer">
          <h1 className="categoryName">{this.context.category}</h1>
        </div>
        <main className="productList">
          {this.context.category === "all"
            ? showAllProducts
            : showProductsByCAtegory}
        </main>
      </div>
    );
  };
}
