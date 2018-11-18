import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";
import Products from "../componentsSeller/Products";
import SideBar from "../componentsSeller/SideBar";
import Orders from "../componentsSeller/Orders";
import Profile from "../componentsSeller/Profile";

function IndexPageSeller(props) {
  return (
    <div>
      <SideBar />

      {props.navigatorSeller.productsShow && props.sellerData.login && (
        <Products />
      )}

      {props.navigatorSeller.profileShow && <Profile />}

      {props.navigatorSeller.ordersShow && <Orders />}

      {/*
      

       */}

      {/* {props.sellerData.selectedProduct &&
        props.navigatorSeller.editProductShow && (
          <EditOrder style={{ left: "250 px" }} />
        )} */}
    </div>
  );
}

IndexPageSeller.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(IndexPageSeller);