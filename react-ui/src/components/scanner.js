import React from "react";
import Quagga from "quagga";
import axios from "axios";
import Summary from "./summary";

class Scanner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      codeId: "",
      isExist: false
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

  validateCode() {
    this.setState({ codeId: "" });
    return axios
      .get("/api/code/get", {
        params: {
          code: this.state.code
        }
      })
      .then(res => {
        this.setState({ codeId: res.data._id });
      });
  }

  _onDetected(result) {
    this.setState({ code: result.codeResult.code });

    this.validateCode().then(result => {
      if (this.state.codeId == null) {
        this.setState({ isExist: false });
      } else {
        this.setState({ isExist: true });
      }
    });
  }

  render() {
    return (
      <>
        <div id="cam-container" />
        <Summary code={this.state.code} isExist={this.state.isExist} />
      </>
    );
  }
}

export default Scanner;
