import React, { Component, Fragment } from "react";
import "./App.css";
import { Router } from "@reach/router";
import Home from "./components/Home";
import Topics from "./components/Topics";
import Users from "./components/Users";
import SignIn from "./components/SignIn";
import SingleArt from "./components/SingleArt";
import ArticleSearch from "./components/ArticleSearch";
import ArticlesByTopic from "./components/ArticlesByTopic";
import PostArticle from "./components/PostArticle";
import SingleUser from "./components/SingleUser";
import Error from "./components/Error";

class App extends Component {
  state = {
    username: null
  };

  handleSignIn = (event, username) => {
    event.preventDefault();
    this.setState({ username });
    window.localStorage.setItem("username", username);
  };

  render() {
    const { username } = this.state;
    console.log(username);
    return (
      <Fragment>
        {/* {username && console.log('******') && */}
        <Router>
          <SignIn path="/" handleSignIn={this.handleSignIn} />
          <Home path="/home" />
          <Topics path="/topics" />
          <Users path="/users" />
          <SingleArt path="/articles/:article_id" />
          <ArticlesByTopic path="articles/topic/:topic" />
          <ArticleSearch path="/articles" />
          <SingleUser path="/user/:user" />
          <PostArticle path="/postarticle" />
          <Error path="/error" />
        </Router>{" "}
        {/*}*/}
      </Fragment>
    );
  }
}

export default App;
