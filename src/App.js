import React, { Component, Fragment } from "react";
import "./styling/App.css";
import { Router } from "@reach/router";
import Home from "./components/Home";
import Topics from "./components/Topics";
import Users from "./components/Users";
import SignIn from "./components/SignIn";
import SingleArt from "./components/SingleArt";
import PostArticle from "./components/PostArticle";
import SingleUser from "./components/SingleUser";
import HandleError from "./components/HandleError";
import { getUsers } from "./Api";

class App extends Component {
  state = {
    username: null,
    errStatus: false
  };

  handleSignIn = (event, username) => {
    event.preventDefault();
    getUsers(username)
      .catch(err => {
        this.setState({
          errStatus: {
            message:
              err.response.data.message || "Sorry this username is invalid",
            status: err.response.request.status || 400
          },
          replace: true
        });
      })
      .then(() => {
        this.setState({ username });
      });
    window.localStorage.setItem("username", username);
  };

  render() {
    const { username, errStatus } = this.state;
    if (errStatus)
      return (
        <div className="SignIn">
          <header className="Sign-in-header" />
          <h1>Welcome to NC News!</h1>
          <h4>Please enter your username</h4>
          <h3>Username doesn't exist. Please try again!</h3>
          <p>Page will refresh in just a moment</p>
          <script type="text/javascript">
            {setTimeout(function() {
              window.location.reload();
            }, 3000)}
          </script>
        </div>
      );
    return (
      <Fragment>
        <SignIn path="/" handleSignIn={this.handleSignIn} username={username}>
          <Router>
            <Home path="/home" username={username} />
            <Home path="articles/topic/:topic" username={username} />
            <Home path="articles/topic/:slug" username={username} />
            <Topics path="/topics" />
            <Users path="/users" />
            <SingleArt path="/articles/:article_id" username={username} />
            <SingleUser path="/user/:user" />
            <PostArticle path="/postarticle" username={username} />
            <HandleError default />
          </Router>{" "}
        </SignIn>
      </Fragment>
    );
  }
}

export default App;
