import React from "react";
import PropTypes from "prop-types";

class Summary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isScanning: false
    };
  }

  render() {
    return (
      <>
        <h2>{this.props.code}</h2>
        <p>Sprzedałeś piwo?</p>
        <button>Tak</button>
        <button>Nie</button>
      </>
    );
  }

}


Summary.propTypes = {
    code: PropTypes.string.isRequired
  };

export default Summary;
