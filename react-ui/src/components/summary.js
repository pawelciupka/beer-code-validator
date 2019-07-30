import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

class Summary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      isExist: false,
      bgColor: "#ffffff"
    };

    this.addCode = this.addCode.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ code: this.props.code });
    this.setState({ isExist: this.props.isExist });

    if(this.props.isExist) {
      this.setState({ bgColor: "red" });
    } else {
      this.setState({ bgColor: "green" });
    }
  }

  addCode() {
    if (this.state.isExist === false) {
      console.log("ADD CODE");
      axios({
        url: "api/code/create",
        method: "post",
        data: {
          code: this.state.code
        }
      });
    } else {
      console.log("CODE EXIST IN DB");
    }
    this.setState({ code: "" });
  }

  render() {
    return (
      <div style={{backgroundColor: this.state.bgColor}}>
        <h2>{this.state.code}</h2>
        <p>Sprzedałeś piwo?</p>
        <Button variant="success" onClick={this.addCode}>
          Tak
        </Button>
        <Button variant="danger">
          Nie
        </Button>
      </div>
    );
  }
}

Summary.propTypes = {
  code: PropTypes.string.isRequired
};

export default Summary;
