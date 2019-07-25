import React from "react";
import Quagga from "quagga";
import axios from "axios";
import Summary from "./summary";

class Scanner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: "",
      codeObj: null,
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
    this.setState({ codeObj: null });

    return axios
      .get("/api/code/get", {
        data: {
          code: this.state.result
        }
      })
      .then(res => {
        console.log("2. server response:" + res.data);
        this.setState({ codeObj: res.data });
      });

    // axios({
    //   url: "api/code/get",
    //   method: "get",
    //   data: {
    //     code: this.state.result
    //   }
    // }).then(res => {
    //   this.setState({ codeObj: res.data });
    // });
  }

  _onDetected(result) {
    this.setState({ result: result.codeResult.code });
    this.validateCode().then(result => {
      console.log("code: " + this.state.result);
      console.log("result: " + result);
      console.log("codeObj: " + this.state.codeObj);
      if (this.state.codeObj === null) {
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
        <Summary code={this.state.result} isExist={this.state.isExist} />
      </>
    );
  }
}

export default Scanner;
