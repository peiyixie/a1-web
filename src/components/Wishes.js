import React from "react";
import { connect } from "dva";
import { loadWishes } from "../services/webServices";
import ReactTable from "react-table";
import "react-table/react-table.css";

class Wishes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: "Welcome to a1 marketplace",
      wishes: {},
      selectedWish: {}
    };
  }

  async load() {
    const response = await loadWishes(this.props.buyerData.user.id);
    console.log("getting wishlist for ", this.props.buyerData.user.id);
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
              Header: "Wishes",
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
                      selectedWish: rowInfo.row.id
                    }
                  });
                  console.log(this.props.buyerData.selectedWish);
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

Wishes.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Wishes);
