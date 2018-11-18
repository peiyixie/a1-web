import React from "react";
import { connect } from "dva";
import stylescss from "./Profile.css";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { updateProfileCallSeller } from "../services/webServices";

const ProfileContainer = styled.div`
  background-color: #f2f2f2;
  width: 80%;
  height: 740px;
  left: 240px;
  bottom: 0;
  position: fixed;
`;

const styles = theme => ({
  menu: {
    width: 200
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  row: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px"
  }
});

const ConfirmationButton = styled.div`
  height: 40px;
  width: 353px;
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

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.sellerData.user.email,
      name: this.props.sellerData.user.name,
      address: this.props.sellerData.user.address,
      bank: this.props.sellerData.user.bank
    };
  }
  componentDidMount() {}
  componentWillUnmount() {}

  handleChangeText = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleSubmit = event => {
    console.log("handleSubmit, uploading changes:");
    console.log(this.state);

    const updateProfile = async () => {
      const response = await updateProfileCallSeller(
        this.props.sellerData.user.id,
        this.state.name,
        this.state.email,
        this.state.bank,
        this.state.address
      );
      if (response.data.email !== "failed") {
        alert("Updated successfully!");
        this.props.dispatch({
          type: "sellerData/save",
          payload: {
            user: response.data
          }
        });
      } else {
        alert("Update failed");
      }
      console.log(response);
    };
    updateProfile();
  };
  render() {
    const { classes } = this.props;
    return (
      <ProfileContainer>
        Update Your Profile
        <form autoComplete="off">
          <div className={stylescss.textField}>
            <TextField
              id="outlined-helperText"
              label="Username"
              value={this.state.name}
              className={classes.textField}
              onChange={this.handleChangeText("name")}
              margin="normal"
              fullWidth
              variant="outlined"
            />
          </div>
          <p />
          <div className={stylescss.textField}>
            <TextField
              id="outlined-helperText"
              label="Credit Card"
              value={this.state.bank}
              className={classes.textField}
              onChange={this.handleChangeText("bank")}
              margin="normal"
              fullWidth
              variant="outlined"
            />
          </div>
          <p />

          <div className={stylescss.textField}>
            <TextField
              id="outlined-helperText"
              label="Address"
              value={this.state.address}
              className={classes.textField}
              onChange={this.handleChangeText("address")}
              margin="normal"
              fullWidth
              variant="outlined"
            />
          </div>
          <p />
          <div className={stylescss.textField}>
            <TextField
              id="outlined-helperText"
              label="Email"
              value={this.state.email}
              className={classes.textField}
              onChange={this.handleChangeText("email")}
              margin="normal"
              fullWidth
              variant="outlined"
            />
          </div>
          <p />

          <ConfirmationButton
            onClick={() => this.handleSubmit()}
            type="primary"
            htmlType="submit"
          >
            Confirm
          </ConfirmationButton>
        </form>
      </ProfileContainer>
    );
  }
}

Profile.propTypes = {};

function mapStateToProps(state) {
  return state;
}

Profile = withStyles(styles, { withTheme: true })(Profile);
export default connect(mapStateToProps)(Profile);
