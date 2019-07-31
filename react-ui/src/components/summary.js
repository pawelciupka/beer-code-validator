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
      bgColor: "rgba(255, 255, 255, 0)",
      summaryMessage: "",
      display: "none"
    };

    this.addCode = this.addCode.bind(this);
    this.cancelCode = this.cancelCode.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ code: this.props.code });
    this.setState({ isExist: this.props.isExist });

    if (this.props.isExist) {
      this.setState({ bgColor: "red" });
      this.setState({ summaryMessage: "Nie możesz sprzedać piwa" });
      this.setState({ display: "none" });
    } else {
      this.setState({ bgColor: "green" });
      this.setState({ summaryMessage: "Chcesz sprzedać piwo?" });
      this.setState({ display: "flex" });
    }
  }

  addCode() {
    if (this.state.isExist === false) {
      axios({
        url: "api/code/create",
        method: "post",
        data: {
          code: this.state.code
        }
      });
    }
    this.setState({ code: "" });
    this.setState({ bgColor: "rgba(255, 255, 255, 0)" });
    this.setState({ summaryMessage: "Kod został dodany do bazy" });
    this.setState({ display: "none" });
  }

  cancelCode() {
    this.setState({ code: "" });
    this.setState({ isExist: false });
    this.setState({ bgColor: "rgba(255, 255, 255, 0)" });
    this.setState({ summaryMessage: "" });
    this.setState({ display: "none" });
  }

  render() {
    return (
      <div className="summary-container">
        <div className="code-container">
          <span>{this.state.code}</span>
        </div>
        <div
          className="summary-result"
          style={{ backgroundColor: this.state.bgColor }}
        >
          <p className="summary-message">{this.state.summaryMessage}</p>

          <div
            className="summary-btn-container"
            style={{ display: this.state.display }}
          >
            <Button variant="success" onClick={this.addCode}>
              Tak
            </Button>
            <Button variant="danger" onClick={this.cancelCode}>
              Nie
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

Summary.propTypes = {
  code: PropTypes.string.isRequired
};

export default Summary;
