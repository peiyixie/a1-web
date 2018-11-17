import React from "react";
import { connect } from "dva";
import styles from "./RegistrationPage.css";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { registerBuyer } from "../services/webServices";
import styled from "styled-components";
import "antd/dist/antd.css";
import { routerRedux } from "dva/router";

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

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phone: "",
      address: "",
      bank: "",
      password: "",
      confirmPassword: "",
      showPassword: false
    };
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleChangeText = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handlePassChange = e => {
    this.setState({
      password: e.target.value
    });
  };
  handleConfirmPassChange = e => {
    this.setState({ confirmPassword: e.target.value });
  };

  async register() {
    try {
      console.log(this.state.email);
      console.log(this.state.password);
      console.log(this.state.confirmPassword);
      if (this.state.password !== this.state.confirmPassword) {
        alert("Password not match");
        return;
      } else {
        const response = await registerBuyer(
          this.state.name,
          this.state.address,
          this.state.bank,
          this.state.phone,
          this.state.email,
          this.state.password
        );
        console.log(response);

        if (response.data.email !== "failed") {
          alert(
            "User " +
              response.data.phone +
              " created successfully. Please use your phone number to login."
          );
        } else {
          alert("Registration failed");
        }

        this.props.dispatch(
          routerRedux.push({
            pathname: "/buyers/login"
          })
        );

        return;
      }
    } catch (error) {
      alert("Password not match");
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
            autoFocus
            id="outlined-email-input"
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            value={this.state.email}
            fullWidth
            onChange={this.handleChangeText("email")}
          />
        </div>

        <div className={styles.textField}>
          <TextField
            autoFocus
            id="outlined-phone-input"
            label="Phone"
            type="phone"
            name="phone"
            variant="outlined"
            value={this.state.phone}
            fullWidth
            onChange={this.handleChangeText("phone")}
          />
        </div>

        <div className={styles.textField}>
          <TextField
            autoFocus
            id="outlined-bank-input"
            label="Credit Card"
            type="bank"
            name="bank"
            variant="outlined"
            value={this.state.bank}
            fullWidth
            onChange={this.handleChangeText("bank")}
          />
        </div>

        <div className={styles.textField}>
          <TextField
            autoFocus
            id="outlined-address-input"
            label="Address"
            type="address"
            name="address"
            variant="outlined"
            value={this.state.address}
            fullWidth
            onChange={this.handleChangeText("address")}
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
        <div className={styles.textField}>
          <TextField
            fullWidth
            error={this.state.confirmPassword !== this.state.password}
            id="outlined-password-input2"
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={this.state.confirmPassword}
            onChange={this.handleConfirmPassChange}
          />
        </div>

        <div
          style={{
            width: "100%",
            textAlign: "center",
            color: "#4169e1"
          }}
          onClick={() => {
            this.props.dispatch(
              routerRedux.push({
                pathname: "/buyers/login"
              })
            );
          }}
        >
          Already have an account? Click to login
        </div>
        <ConfirmationContainer>
          <ConfirmationButton onClick={() => this.register()}>
            Register
          </ConfirmationButton>
        </ConfirmationContainer>
      </div>
    );
  }
}

RegistrationPage.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(RegistrationPage);
