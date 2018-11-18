import React from "react";
import { connect } from "dva";
import styles from "./AddCart.css";
import { Rate, InputNumber } from "antd";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";

import styled from "styled-components";
import {
  loadProductById,
  addCartItem,
  addToWish
} from "../services/webServices";

//image container TODO
const ImageContainer = styled.div`
  border-radius: 0px;
  transform: translate(1%, 3%);
  cursor: pointer;
  background: transparent;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 15px;
  z-index = 1000;
  align-items: center;
  text-align: center;
`;
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
          <ImageContainer>
            <img
              width="150px"
              src={
                this.state.product.filename ||
                "https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg"
              }
            />
          </ImageContainer>

          <div className={styles.Display}>
            <div>{this.state.product.name + "'s "} </div>
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
            className={styles.Display}
            min={1}
            max={this.state.product.quantity}
            defaultValue={this.state.product.quantity}
            onChange={value => {
              this.onChange(value);
            }}
          />

          <div
            className={styles.Button}
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
            className={styles.Button}
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
