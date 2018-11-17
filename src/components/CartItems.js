import React from "react";
import { connect } from "dva";
import { loadCartItems } from "../services/webServices";
import ReactTable from "react-table";
import "react-table/react-table.css";

class CartItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: "Welcome to a1 marketplace",
      cartItems: {},
      selectedWish: {}
    };
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
                { Header: "Quantity", accessor: "quantity" }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          getTrProps={(state, rowInfo) => {
            if (rowInfo && rowInfo.row) {
              return {
                onClick: e => {
                  this.setState({ selected: rowInfo.index });

                  this.props.dispatch({
                    type: "buyerData/save",
                    payload: {
                      selectedCartItem: rowInfo.row.id
                    }
                  });
                  console.log(this.props.buyerData.selectedCartItem);
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
      </div>
    );
  }
}

CartItems.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(CartItems);
