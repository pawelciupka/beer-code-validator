import React from "react";
import Scanner from "./scanner";
// import Result from "./Result";

class CodeValidator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isScanning: false,
      result: []
    };

    this.startScanning = this.startScanning.bind(this);
    this.detectedFunc = this.detectedFunc.bind(this);

  }

  render() {
    return (
      <div>
        <button onClick={this.startScanning}>
          {this.state.isScanning ? "Stop" : "Start"}
        </button>
        {/* <ul className="results">
          {this.state.results.map(result => (
            <Result key={result.codeResult.code} result={result} />
          ))}
        </ul> */}
        {this.state.isScanning ? (
          <Scanner />
        ) : null}
      </div>
    );
  }

  startScanning() {
    this.setState({ isScanning: !this.state.isScanning });
  }

  detectedFunc(result) {
    this.setState({ results: this.state.results.concat([result]) });
    console.log(result);
  }
}

export default CodeValidator;
