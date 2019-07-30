import React from "react";
import Scanner from "./scanner";
import { Button } from "react-bootstrap";


class ScannerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isScanning: false
    };

    this.startScanning = this.startScanning.bind(this);
  }

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.startScanning}>
          {this.state.isScanning
            ? "Zakończ skanowanie"
            : "Rozpocznij skanowanie"}
        </Button>
        {this.state.isScanning ? <Scanner /> : null}
      </>
    );
  }

  startScanning() {
    this.setState({ isScanning: !this.state.isScanning });
  }
}

export default ScannerContainer;
