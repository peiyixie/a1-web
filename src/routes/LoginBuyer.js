import React from "react";
import { connect } from "dva";
import styles from "./LoginPage.css";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { loginBuyer } from "../services/webServices";
import styled from "styled-components";
import { routerRedux } from "dva/router";
import "antd/dist/antd.css";

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

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { phone: "", password: "", showPassword: false };
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleUserChange = e => {
    this.setState({
      phone: e.target.value
    });
  };

  handlePassChange = e => {
    this.setState({
      password: e.target.value
    });
  };

  async login(phone, password) {
    try {
      console.log("login function");
      phone = this.state.phone;
      password = this.state.password;
      const response = await loginBuyer(phone, password);
      console.log("response");
      console.log(response);

      if (!response.data.id || response >= 500) {
        alert("Errors logging in.");
        return false;
      } else {
        this.props.dispatch({
          type: "buyerData/save",
          payload: {
            login: true,
            user: response.data
          }
        });
        this.props.dispatch(
          routerRedux.push({
            pathname: "/"
          })
        );
        return true;
      }
    } catch (error) {
      alert("Wrong user name or password");
      console.log(error);
    }
  }

  componentDidMount() {}
  componentWillUnmount() {}

  handleSubmit() {
    console.log("handleSubmit function called");
    this.login();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className={styles.Root}>
        <div>
          <img
            src="https://imgur.com/huYgxAY.png"
            alt="A1 Marketplace"
            className={styles.Pic}
          />
        </div>

        <div className={styles.textField}>
          <TextField
            autoFocus
            id="outlined-phone-input"
            label="phone"
            type="phone"
            name="phone"
            variant="outlined"
            value={this.state.phone}
            fullWidth
            onChange={this.handleUserChange}
          />
        </div>
        <div className={styles.textField}>
          <TextField
            fullWidth
            id="outlined-password-input"
            label="Password"
            type={this.state.showPassword ? "text" : "password"}
            variant="outlined"
            value={this.state.password}
            onChange={this.handlePassChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </div>
        <div
          style={{ color: "#4169e1" }}
          onClick={() => {
            this.props.dispatch(
              routerRedux.push({
                pathname: "/buyers/register"
              })
            );
          }}
        >
          Not Registered Yet? Click to register.
        </div>
        <ConfirmationContainer>
          <ConfirmationButton onClick={() => this.login()}>
            Login
          </ConfirmationButton>
        </ConfirmationContainer>
      </div>
    );
  }
}

LoginPage.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(LoginPage);
