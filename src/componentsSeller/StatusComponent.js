import React from "react";
import { connect } from "dva";
import { Rate } from "antd";
import "antd/dist/antd.css";

import styles from "../routes/RegistrationPage.css";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { Input } from "antd";
import { changeStatus } from "../services/webServices";
import MenuItem from "@material-ui/core/MenuItem";

const { TextArea } = Input;

const RatingContainer = styled.div`
  height: 265px;
  width: 100%;
  text-align: center;
  color: #4169e1;
  box-sizing: border-box;
  justify-content: flex-start;
  left: 240px;
  bottom: 0;
  position: fixed;
  z-index: 999;
  background-color: #f2f2f2;
  padding: 11px;
`;

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

const optionsStatus = [
  {
    value: "Payment Confirmed",
    label: "Payment Confirmed"
  },
  {
    value: "Cancelled",
    label: "Cancelled"
  },
  {
    value: "Shipped",
    label: "Shipped"
  },
  {
    value: "Delivered",
    label: "Delivered"
  }
];

class StatusComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
  }

  handleChangeText = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <RatingContainer>
        <div className={styles.textField}>
          <TextField
            id="outlined-select-status"
            select
            label="Status"
            className={styles.textField}
            value={this.state.status}
            onChange={this.handleChangeText("status")}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            {optionsStatus.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <ConfirmationButton
          onClick={e => {
            e.stopPropagation();
            this.handleSubmit();
          }}
        >
          Confirm
        </ConfirmationButton>
      </RatingContainer>
    );
  }

  async handleSubmit() {
    const response = await changeStatus(
      this.props.sellerData.selectedOrderItem,
      this.state.status
    );
    console.log(response);
    alert("Successfully set to " + response.data["status"]);

    this.props.dispatch({
      type: "navigatorSeller/clear"
    });

    this.props.dispatch({
      type: "navigatorSeller/save",
      payload: {
        ordersShow: true
      }
    });
  }
}

StatusComponent.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(StatusComponent);
