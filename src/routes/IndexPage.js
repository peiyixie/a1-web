import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";
import Products from "../components/Products";
import LoginBuyerButton from "../components/LoginBuyerButton";

function IndexPage(props) {
  return (
    <div>
      <LoginBuyerButton />

      <Products />
    </div>
  );
}

IndexPage.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(IndexPage);
