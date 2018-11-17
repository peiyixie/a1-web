import React from "react";
import { connect } from "dva";
import { loadOrders } from "../services/webServices";
import ReviewComponent from "../components/ReviewComponent";
import ReactTable from "react-table";
import "react-table/react-table.css";

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: "Welcome to a1 marketplace",
      orders: {}
    };
  }

  async load() {
    const response = await loadOrders(this.props.buyerData.user.id);
    console.log("getting orders for ", this.props.buyerData.user.id);
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
              Header: "Orders",
              columns: [
                { Header: "Product Id", accessor: "product.id" },
                { Header: "Order Id", accessor: "id" },
                { Header: "Name", accessor: "product.name" },
                { Header: "Price", accessor: "price" },
                { Header: "Quantity", accessor: "quantity" },
                { Header: "Status", accessor: "status" }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          getTrProps={(state, rowInfo) => {
            if (rowInfo && rowInfo.row) {
              return {
                onClick: e => {
                  this.setState({
                    selected: rowInfo.index,
                    selectedDelivered:
                      rowInfo.row.status === "Delivered" ? true : false
                  });
                  this.props.dispatch({
                    type: "buyerData/save",
                    payload: {
                      selectedOrderItem: rowInfo.row.id,
                      selectedProduct: rowInfo.row["product.id"]
                    }
                  });

                  console.log(this.props.buyerData);
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
        {this.state.selectedDelivered && <ReviewComponent />}
      </div>
    );
  }
}

Orders.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Orders);
