import React from "react";
import { connect } from "dva";
import styles from "./RegistrationPage.css";
import TextField from "@material-ui/core/TextField";

import { editItem, loadProductById } from "../services/webServices";
import styled from "styled-components";
import "antd/dist/antd.css";
import { routerRedux } from "dva/router";
import MenuItem from "@material-ui/core/MenuItem";
import classNames from "classnames";

const ConfirmationContainer = styled.div`
  height: 80px;
  /* background-color: black; */
`;

const ConfirmationButton = styled.div`
  height: 40px;
  width: 331px;
  border-radius: 5px;
  padding-top: 8px;
  left: 50%;
  transform: translate(-50%, 50%);
  cursor: pointer;
  background: linear-gradient(-45deg, #4169e1, #7363d6);
  text-align: center;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  box-sizing: border-box;
  position: absolute;
`;

const categories = [
  {
    value: "Electronics",
    label: "Electronics"
  },
  {
    value: "Fashion",
    label: "Fashion"
  },
  {
    value: "Health, Beauty",
    label: "Health, Beauty"
  },
  {
    value: "Babies, Kids",
    label: "Babies, Kids"
  },
  {
    value: "Others",
    label: "Others"
  }
];

class AddItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      url: "",
      quantity: 1,
      price: 1,
      category: ""
    };
  }

  handleChangeText = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  async register() {
    try {
      const response = await editItem(
        this.props.sellerData.selectedProduct,
        this.state.name,
        this.state.description,
        this.state.url,
        this.state.quantity,
        this.state.price,
        this.state.category
      );
      console.log(response);

      if (response.data.filename !== "failed") {
        alert("Item " + response.data.name + " updated successfully.");

        this.props.dispatch(
          routerRedux.push({
            pathname: "/sellers"
          })
        );
      } else {
        alert("Creation of item failed");
      }
      return;
    } catch (error) {
      console.log(error);
      alert("Cannot get a response from server");
    }
  }

  async load() {
    const response = await loadProductById(
      this.props.sellerData.selectedProduct
    );

    console.log(response.data);
    const product = response.data;
    this.setState({
      name: product.name,
      description: product.description,
      url: product.filename,
      quantity: product.quantity,
      price: product.price,
      category: product.category
    });
  }

  componentDidMount() {
    this.load();
  }
  componentWillUnmount() {}

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={styles.Root}>
        <div>
          <h1> Edit an Item {this.props.sellerData.selectedProduct}</h1>
        </div>

        <div className={styles.textField}>
          <TextField
            autoFocus
            id="outlined-name-input"
            label="Name"
            type="name"
            name="name"
            variant="outlined"
            value={this.state.name}
            fullWidth
            onChange={this.handleChangeText("name")}
          />
        </div>
        <div className={styles.textField}>
          <TextField
            id="outlined-description-input"
            label="Description"
            type="description"
            name="description"
            variant="outlined"
            value={this.state.description}
            fullWidth
            onChange={this.handleChangeText("description")}
          />
        </div>

        <div className={styles.textField}>
          <TextField
            id="outlined-price-input"
            label="Price"
            type="price"
            name="price"
            variant="outlined"
            value={this.state.price}
            fullWidth
            onChange={this.handleChangeText("price")}
          />
        </div>

        <div className={styles.textField}>
          <TextField
            id="outlined-quantity-input"
            label="Quantity"
            type="quantity"
            name="quantity"
            variant="outlined"
            value={this.state.quantity}
            fullWidth
            onChange={this.handleChangeText("quantity")}
          />
        </div>

        <div className={styles.textField}>
          <TextField
            id="outlined-url-input"
            label="Image URL"
            type="url"
            name="url"
            variant="outlined"
            value={this.state.url}
            fullWidth
            onChange={this.handleChangeText("url")}
          />
        </div>
        <div className={styles.textField}>
          <TextField
            id="outlined-select-category"
            select
            label="Category"
            className={styles.textField}
            value={this.state.category}
            onChange={this.handleChangeText("category")}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            {categories.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <ConfirmationContainer>
          <ConfirmationButton onClick={() => this.register()}>
            Confirm
          </ConfirmationButton>
        </ConfirmationContainer>
      </div>
    );
  }
}

AddItemPage.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(AddItemPage);
