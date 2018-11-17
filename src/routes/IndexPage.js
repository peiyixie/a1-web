import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";
import Products from "../components/Products";
import AddCart from "../components/AddCart";
import SideBar from "../components/SideBar";
import Wishes from "../components/Wishes";
import CartItems from "../components/CartItems";

function IndexPage(props) {
  return (
    <div>
      <SideBar />

      {props.buyerData.selectedProduct && (
        <div>
          Welcome to A1 Marketplace
          {props.buyerData.user.name}
        </div>
      )}

      {props.navigator.productsShow && <Products />}

      {props.navigator.wishesShow && <Wishes />}

      {props.navigator.cartShow && <CartItems />}

      {props.buyerData.selectedProduct && props.navigator.addCartShow && (
        <AddCart style={{ left: "250 px" }} />
      )}
    </div>
  );
}

IndexPage.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(IndexPage);
