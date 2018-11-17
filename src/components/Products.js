import React from "react";
import { connect } from "dva";
// import styles from "./Products.css";
import { loadProducts } from "../services/webServices";
import ReactTable from "react-table";
import "react-table/react-table.css";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: "Welcome to a1 marketplace",
      products: {},
      selectedProduct: {}
    };
  }

  async load() {
    const response = await loadProducts();
    console.log(response.data);
    this.setState({ data: response.data });
  }
  componentDidMount() {
    this.load();
  }
  componentWillUnmount() {}

  render() {
    return (
      <ReactTable
        data={this.state.data}
        filterable
        columns={[
          {
            Header: "Product",
            columns: [
              { Header: "Id", accessor: "id" },
              { Header: "Name", accessor: "name" },
              { Header: "Category", accessor: "category" }
            ]
          },
          {
            Header: "Stock info",
            columns: [
              { Header: "Price", accessor: "price" },
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
                    selectedProduct: rowInfo.row.id
                  }
                });
                console.log(this.props.buyerData.selectedProduct);
              },
              style: {
                background:
                  rowInfo.index === this.state.selected ? "#00afec" : "white",
                color: rowInfo.index === this.state.selected ? "white" : "black"
              }
            };
          } else {
            return {};
          }
        }}
      />
    );
  }
}

Products.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Products);
