import React from "react";
import { connect } from "dva";
import { Rate } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import { Input } from "antd";
import { postReviewCall } from "../services/webServices";

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

class ReviewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curRating: 5,
      comment: ""
    };
  }

  handleChange = value => {
    this.setState({
      curRating: value
    });
  };

  handleCommentChange = e => {
    this.setState({
      comment: e.target.value
    });
  };

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <RatingContainer>
        <span>
          <Rate style={{ marginBottom: "10px" }} onChange={this.handleChange} />
        </span>
        <TextArea
          type="text"
          placeholder="Add your comment here..."
          onChange={this.handleCommentChange}
          autosize={{ minRows: 2, maxRows: 6 }}
        />
        <ConfirmationButton
          onClick={e => {
            e.stopPropagation();
            this.handlePostReview();
          }}
        >
          Confirm
        </ConfirmationButton>
      </RatingContainer>
    );
  }

  async handlePostReview() {
    const response = await postReviewCall(
      this.props.buyerData.selectedProduct,
      this.state.curRating,
      this.props.buyerData.user.id,
      this.state.comment,
      this.props.buyerData.selectedOrderItem
    ); //pending inputs
    console.log(response);
    alert(response.data.email);
  }
}

ReviewComponent.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(ReviewComponent);
