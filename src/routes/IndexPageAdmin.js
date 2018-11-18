import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";
import SideBar from "../componentsAdmin/SideBar";
import Buyers from "../componentsAdmin/Buyers";
import Sellers from "../componentsAdmin/Sellers";

function IndexPageAdmin(props) {
  return (
    <div>
      <SideBar />

      {props.navigatorAdmin.buyerShow && props.adminData.login && <Buyers />}

      {props.navigatorAdmin.sellerShow && props.adminData.login && <Sellers />}
    </div>
  );
}

IndexPageAdmin.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(IndexPageAdmin);
