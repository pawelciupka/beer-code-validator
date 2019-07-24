import React from "react";
import Quagga from "quagga";
import Summary from "./summary";

class Scanner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: ""
    };

    this._onDetected = this._onDetected.bind(this);
  }

  componentDidMount() {
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
    Quagga.onDetected(this._onDetected);
  }

  render() {
    return (
      <>
        <div id="cam-container" />
        <Summary code={this.state.result}/>
      </>
    );
  }

  _onDetected(result) {
    console.log(result.codeResult.code);
    this.setState({ result: result.codeResult.code });
  }
}

export default Scanner;
