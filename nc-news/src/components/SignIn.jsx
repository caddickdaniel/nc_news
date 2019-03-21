import React, { Component } from "react";
// import { validateUser } from "../Api";

class SignIn extends Component {
  state = {
    username: null,
    loggedIn: false
  };

  handleChange = event => {
    this.setState({ username: event.target.value });
  };

  handleSignIn = (event, username) => {
    event.preventDefault();
    this.setState({ username });
    window.localStorage.setItem("username", username);
    // validateUser(username);
  };

  render() {
    return (
      <div className="SignIn">
        <header className="Sign-in-header" />
        <h1>Welcome to NC News!</h1>
        <h4>Please enter your username</h4>
        <form
          onSubmit={event =>
            this.props.handleSignIn(event, this.state.username)
          }
        >
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

export default SignIn;
