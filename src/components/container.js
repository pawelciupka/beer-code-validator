import React from "react";
import Scanner from "./scanner";

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isScanning: false
    };

    this.startScanning = this.startScanning.bind(this);
  }

  render() {
    return (
      <div>
        <button onClick={this.startScanning}>
          {this.state.isScanning ? "Stop" : "Start"}
        </button>
        {this.state.isScanning ? <Scanner /> : null}
      </div>
    );
  }

  startScanning() {
    this.setState({ isScanning: !this.state.isScanning });
  }
}

export default Container;
