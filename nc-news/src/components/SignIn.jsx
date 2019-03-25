import React, { Component } from "react";
import Error from "./Error";

class SignIn extends Component {
  state = {
    errStatus: false
  };

  handleChange = event => {
    this.setState({ username: event.target.value });
  };

  handleSubmit = event => {
    const { username } = this.state;
    this.props.handleSignIn(event, username);
  };

  render() {
    const { errStatus } = this.state;
    const { username } = this.props;

    if (username) return this.props.children;
    if (errStatus) return <Error errStatus={errStatus} />;
    return (
      <div className="SignIn">
        <header className="Sign-in-header" />
        <h1>Welcome to NC News!</h1>
        <h4>Please enter your username</h4>
        <form onSubmit={this.handleSubmit}>
          <input
            name="username"
            placeholder="User: e.g. grumpy19"
            onChange={this.handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default SignIn;
