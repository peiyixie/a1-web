import React from "react";
import { connect } from "dva";
import {
  loadCartItems,
  checkoutCall,
  deleteCartItemCall
} from "../services/webServices";
import ReactTable from "react-table";
import "react-table/react-table.css";
import styled from "styled-components";

const ConfirmationContainer = styled.div`
  height: 160px;
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

const DeleteButton = styled.div`
  height: 40px;
  width: 331px;
  border-radius: 5px;
  padding-top: 8px;
  left: 50%;
  transform: translate(-50%, -150%);
  cursor: pointer;
  background: linear-gradient(-45deg, #4169e1, #7363d6);
  text-align: center;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  box-sizing: border-box;
  position: absolute;
`;

class CartItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: "Welcome to a1 marketplace",
      cartItems: {},
      selectedCartItem: null
    };
  }

  async checkout() {
    const response = await checkoutCall(this.props.buyerData.user.id);
    console.log("checking out for", this.props.buyerData.user.id);
    console.log(response.data.email);
    if (response.data.email !== "") {
      alert(response.data.email);
    }
    this.load();
  }

  async deleteCartItem() {
    const response = await deleteCartItemCall(this.state.selectedCartItem);
    console.log("deleting cart item for", this.state.selectedCartItem);
    console.log(response.data.email);
    alert(response.data.email);
    this.setState({ selectedCartItem: null });
    this.load();
  }

  async load() {
    const response = await loadCartItems(this.props.buyerData.user.id);
    console.log("getting CartItems for ", this.props.buyerData.user.id);
    console.log(response);
    this.setState({ data: response.data });
  }
  componentDidMount() {
    this.load();
  }
  componentWillUnmount() {}

  render() {
    return (
      <div>
        <ReactTable
          data={this.state.data}
          filterable
          columns={[
            {
              Header: "CartItems",
              columns: [
                { Header: "Id", accessor: "id" },
                { Header: "Name", accessor: "product.name" },
                { Header: "Category", accessor: "product.category" }
              ]
            },
            {
              Header: "Order info",
              columns: [
                { Header: "Price", accessor: "product.price" },
                { Header: "Ordered", accessor: "quantity" },
                { Header: "Available", accessor: "product.quantity" }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          getTrProps={(state, rowInfo, columns) => {
            if (rowInfo && rowInfo.row) {
              return {
                onClick: e => {
                  this.setState({
                    selected: rowInfo.index,
                    selectedCartItem: rowInfo.row.id
                  });

                  console.log(this.state.selectedCartItem);
                },
                style: {
                  background:
                    rowInfo.index === this.state.selected ? "#00afec" : "white",
                  color:
                    rowInfo.index === this.state.selected ? "white" : "black"
                }
              };
            } else {
              return {};
            }
          }}
        />
        <ConfirmationContainer>
          <ConfirmationButton onClick={() => this.checkout()}>
            Add to Cart
          </ConfirmationButton>
        </ConfirmationContainer>

        <ConfirmationContainer>
          {this.state.selectedCartItem && (
            <DeleteButton onClick={() => this.deleteCartItem()}>
              Delete this item
            </DeleteButton>
          )}
        </ConfirmationContainer>
      </div>
    );
  }
}

CartItems.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(CartItems);
