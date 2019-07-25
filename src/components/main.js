import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import ScannerContainer from "./scannerContainer";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuth: false,
      password: ""
    };

    this.authorize = this.authorize.bind(this);
  }

  render() {
    return (
      <>
        {!this.state.isAuth ? (
          <>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Hasło"
                aria-label="Hasło"
                aria-describedby="basic-addon3"
              />
            </InputGroup>
            <Button variant="primary" onClick={this.authorize}>
              Autoryzuj
            </Button>
          </>
        ) : null}

        {this.state.isAuth ? <ScannerContainer /> : null}
      </>
    );
  }

  authorize() {
    this.setState({ isAuth: !this.state.isAuth });
  }
}

export default Main;
