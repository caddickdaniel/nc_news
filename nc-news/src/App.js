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
import Error from "./components/Error";
// import { validateUser } from "./Api";

class App extends Component {
  state = {
    username: null
  };

  handleSignIn = (event, username) => {
    event.preventDefault();
    this.setState({ username });
    window.localStorage.setItem("username", username);
    // validateUser(username);
  };

  render() {
    const { username } = this.state;
    console.log(username);
    return (
      <Fragment>
        {/* {username && console.log('******') && */}
        {/* <SignIn path="/" handleSignIn={this.handleSignIn}> */}
        <Router>
          <SignIn path="/" handleSignIn={this.handleSignIn} />
          <Home path="/home" username={username} />
          <Home path="articles/topic/:topic" />
          <Home path="articles/topic/:slug" />
          <Topics path="/topics" />
          <Users path="/users" />
          <SingleArt path="/articles/:article_id" />
          <SingleUser path="/user/:user" />
          <PostArticle path="/postarticle" />
          <Error path="/error" />
        </Router>{" "}
        {/* </SignIn> */}
        {/*}*/}
      </Fragment>
    );
  }
}

export default App;
