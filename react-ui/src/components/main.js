import React from "react";
import { InputGroup, FormControl, Button, Spinner } from "react-bootstrap";
import ScannerContainer from "./scannerContainer";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuth: false,
      password: "",
      authMessage: ""
    };
    this.password = React.createRef();

    this.authorize = this.authorize.bind(this);
  }

  handlePasswordChange() {
    this.setState({ password: this.password.current.value });
  }

  render() {
    return (
      <>
        {!this.state.isAuth ? (
          <div className="auth-container">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Hasło"
                aria-label="Hasło"
                aria-describedby="basic-addon3"
                type="password"
                ref={this.password}
                onChange={() => this.handlePasswordChange()}
              />
            </InputGroup>
            <Button variant="primary" onClick={this.authorize}>
              Autoryzuj
            </Button>
            <div className="authMessage">
              <p>{this.state.authMessage}</p>
            </div>
          </div>
        ) : null}

        {this.state.isAuth ? <ScannerContainer /> : null}
      </>
    );
  }

  authorize() {
    this.setState({ authMessage: "" });
    if (this.state.password === "xd") {
      this.setState({ isAuth: !this.state.isAuth });
    } else {
      this.setState({ authMessage: "Nieprawidłowe hasło" });
    }
  }
}

export default Main;
