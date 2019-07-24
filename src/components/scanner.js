import React from "react";
import PropTypes from "prop-types";
import Quagga from "quagga";

class Scanner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: []
    };

    this.codeDetected = this.codeDetected.bind(this);

  }

  componentDidMount() {
    console.log(this.props.detectedFunc);
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#cam-container")
        },
        decoder: {
          readers: ["ean_reader"]
        }
      },
      function(err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
      }
    );
    Quagga.onDetected(this.codeDetected);
  }

  render() {
    return (
      <>
        <div id="cam-container" />
      </>
    );
  }

  codeDetected(result) {
    this.setState({ results: this.state.results.concat([result]) });
    console.log(result);
  }
}

Scanner.propTypes = {
  detectedFunc: PropTypes.func
};

export default Scanner;
