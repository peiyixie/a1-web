import React, { Component } from "react";
import { connect } from "dva";
import { routerRedux } from "dva/router";
import styled from "styled-components";

import { Input } from "@material-ui/icons";
const LoginButton = styled.div`
  height: 40px;
  width: 80px;
  border-radius: 5px;
  padding-top: 8px;
  transform: translate(-50%, -50%);
  cursor: pointer;
  background: linear-gradient(
    -45deg,
    #4169e1,
    #7363d6
  );
  color: #fff;
  font-size: 14px;
  font-weight: 500;

  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index = 1000;
  align-items: center;
  text-align: center;
`;
class LoginBuyerButton extends Component {
  render() {
    return (
      <div>
        {this.props.buyerData.user.id && (
          <LoginButton
            onClick={() => {
              this.props.dispatch({
                type: "buyerData/save",
                payload: {
                  login: false,
                  user: {}
                }
              });
              this.props.dispatch(
                routerRedux.push({
                  pathname: "/"
                })
              );
            }}
          >
            Logout
          </LoginButton>
        )}
        {!this.props.buyerData.user.id && (
          <LoginButton
            onClick={() => {
              this.props.dispatch(
                routerRedux.push({
                  pathname: "/buyers/login"
                })
              );
            }}
          >
            Login
          </LoginButton>
        )}
      </div>
    );
  }
}

LoginBuyerButton.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(LoginBuyerButton);
