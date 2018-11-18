import React from "react";
import { connect } from "dva";
import { loadOrdersSeller } from "../services/webServices";
import styled from "styled-components";
import PieChart from "react-svg-piechart";

const Div = styled.div`
  margin: 40px;
  left: 265px;
  width: calc(50%);
  position: relative;
  height: 100%;
`;

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: "Hello World",
      pie: [],
      total: 0
    };
  }

  async load() {
    const response = await loadOrdersSeller(this.props.sellerData.user.id);
    console.log(response.data);

    var orders = response.data;

    var count_paied = 0;
    var count_delivered = 0;
    var count_shipped = 0;
    var count_cancelled = 0;

    orders.forEach(element => {
      var e = element["status"].toLowerCase();
      if (e === "payment confirmed") count_paied++;
      else if (e === "delivered") count_delivered++;
      else if (e === "shipped") count_shipped++;
      else if (e === "cancelled") count_cancelled++;
    });

    this.setState({
      pie: [
        { title: "Payment Confirmed", value: count_paied, color: "#22594e" },
        { title: "Delivered", value: count_delivered, color: "#2f7d6d" },
        { title: "Shipped", value: count_shipped, color: "#3da18d" },
        { title: "Cancelled", value: count_cancelled, color: "#69c2b0" }
      ],
      total: count_paied + count_delivered + count_shipped + count_cancelled
    });
  }

  componentDidMount() {
    this.load();
  }
  componentWillUnmount() {}

  render() {
    return (
      <Div>
        {this.state.total > 0 && (
          <PieChart expandOnHover data={this.state.pie} />
        )}

        {this.state.total === 0 && <h1> No orders yet. </h1>}
      </Div>
    );
  }
}

Summary.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Summary);
