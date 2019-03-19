import React, { Component } from "react";
import PropTypes from "prop-types";

class SignIn extends Component {
  state = {
    username: ""
  };

  handleChange = event => {
    this.setState({ username: event.target.value });
  };

  render() {
    return (
      <div className="SignIn">
        <header className="Sign-in-header" />
        <h1>Welcome to NC News!</h1>
        <h4>Please enter your username</h4>
        <form onSubmit={e => this.props.handleSignIn(e, this.state.username)}>
          <input
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        <br />
      </div>
    );
  }
}

SignIn.propTypes = {};

export default SignIn;
