import React from "react";
import { connect } from "dva";
import "./react-table.css";
import { deactivate, getBuyers } from "../services/webServices";
import ReactTable from "react-table";
import styled from "styled-components";
import { routerRedux } from "dva/router";

// import "react-table/react-table.css";

const ConfirmationContainer = styled.div`
  height: 160px;
  /* background-color: black; */
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
      selectedBuyer: {}
    };
  }

  async load() {
    const response = await getBuyers();
    console.log(response.data);
    this.setState({ data: response.data });
  }

  async delete() {
    const response = await deactivate(this.props.adminData.selectedBuyer, 1);
    console.log(response.data);
    alert(response.data.filename);
    this.load();
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
              Header: "Buyer",
              columns: [
                { Header: "Id", accessor: "id" },
                { Header: "Name", accessor: "name" },
                { Header: "Email", accessor: "email" },
                { Header: "Phone", accessor: "phone" },
                { Header: "Email", accessor: "email" },
                { Header: "status", accessor: "status" }
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
                    type: "adminData/save",
                    payload: {
                      selectedBuyer: rowInfo.row.id
                    }
                  });
                  console.log(this.props.adminData.selectedBuyer);
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
          {this.props.adminData.selectedBuyer && (
            <DeleteButton onClick={() => this.delete()}>
              Change user status
            </DeleteButton>
          )}
        </ConfirmationContainer>
      </div>
    );
  }
}

Products.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Products);
