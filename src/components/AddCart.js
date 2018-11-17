import React from "react";
import { connect } from "dva";
import styles from "./AddCart.css";
import { Rate, InputNumber } from "antd";

import {
  loadProductById,
  addCartItem,
  addToWish
} from "../services/webServices";

class AddCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: "Hello World",
      product: {},
      reviews: [],
      rating: 0,
      numRating: 0,
      quantityToAdd: 1,
      adding: false
    };
  }

  async addToCart() {
    console.log(
      "adding to cart",
      this.state.product.name,
      this.state.quantityToAdd,
      this.props.buyerData.user.id
    );
    const response = await addCartItem(
      this.state.product.id,
      this.props.buyerData.user.id,
      this.state.quantityToAdd
    );

    console.log(response);

    if (response.data.quantity === 1) {
      alert("Successfully added.");
    } else {
      alert("Unsuccessful.");
    }
  }

  async addToWishlist() {
    console.log(
      "adding to wishlist",
      this.state.product.name,
      this.props.buyerData.user.id
    );
    const response = await addToWish(
      this.props.buyerData.user.id,
      this.state.product.id
    );

    console.log(response);

    if (response.data.quantity === 1) {
      alert("Successfully added.");
    } else {
      alert("Unsuccessful.");
    }
  }

  onChange(value) {
    console.log("changed", value);
    this.setState({ quantityToAdd: value });
  }

  async load() {
    console.log("loading ", this.props.buyerData.selectedProduct);
    const response = await loadProductById(
      this.props.buyerData.selectedProduct
    );
    console.log(response);
    this.setState({
      product: response.data,
      quantityToAdd: this.state.product.quantity
    });

    var reviews = response.data.reviews;
    var count = 0;
    var total = 0;
    reviews.forEach(e => {
      count = count + 1;
      total = total + e.rating;
    });
    if (count !== 0) {
      this.setState({ rating: total / count, numRating: count });
    } else {
      this.setState({ rating: 0, numRating: 0 });
    }
  }
  componentDidMount() {
    this.load();
  }
  componentWillUnmount() {}

  componentWillReceiveProps() {
    this.load();
  }

  render() {
    {
      return (
        <div className={styles.General}>
          <div className={styles.DisplayOutRat}>
            <div>{this.state.product.name}</div>
            Rating:
            <Rate
              className={styles.DisplayRat}
              disabled
              allowHalf
              value={this.state.rating}
            />
          </div>
          <div className={styles.Display}>{this.state.numRating} Ratings</div>

          <InputNumber
            min={1}
            max={this.state.product.quantity}
            defaultValue={this.state.product.quantity}
            onChange={value => {
              this.onChange(value);
            }}
          />

          <div
            style={{
              width: "100%",
              textAlign: "center",
              color: "#4169e1"
            }}
            onClick={() => {
              if (this.props.buyerData.user.id) {
                this.addToCart();
              } else {
                alert("You are not logged in");
              }
            }}
          >
            Add to cart
          </div>

          <div
            style={{
              width: "100%",
              textAlign: "center",
              color: "#4169e1"
            }}
            onClick={() => {
              if (this.props.buyerData.user.id) {
                this.addToWishlist();
              } else {
                alert("You are not logged in");
              }
            }}
          >
            Add to wishlist
          </div>
        </div>
      );
    }
  }
}

AddCart.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(AddCart);
