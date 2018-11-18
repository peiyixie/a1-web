import React from "react";
import { connect } from "dva";
import "./react-table.css";
import { loadProductsSeller } from "../services/webServices";
import ReactTable from "react-table";
import styled from "styled-components";
import { routerRedux } from "dva/router";

// import "react-table/react-table.css";

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
    const response = await loadProductsSeller(this.props.sellerData.user.id);
    console.log(response.data);
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
          style={{ left: "250 px" }}
          getTrProps={(state, rowInfo) => {
            if (rowInfo && rowInfo.row) {
              return {
                onClick: e => {
                  this.setState({ selected: rowInfo.index });

                  this.props.dispatch({
                    type: "sellerData/save",
                    payload: {
                      selectedProduct: rowInfo.row.id
                    }
                  });
                  console.log(this.props.sellerData.selectedProduct);
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
          <ConfirmationButton
            onClick={e => {
              e.stopPropagation();
              this.props.dispatch({
                type: "navigatorSeller/clear"
              });

              this.props.dispatch(
                routerRedux.push({ pathname: "/sellers/editItem" })
              );
            }}
          >
            Edit Prodct
          </ConfirmationButton>
        </ConfirmationContainer>

        {/* 
        Pending delete product
        <ConfirmationContainer>
          {this.state.selectedCartItem && (
            <DeleteButton onClick={() => this.deleteProduct()}>
              Delete this item
            </DeleteButton>
          )}
        </ConfirmationContainer> */}
      </div>
    );
  }
}

Products.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Products);
