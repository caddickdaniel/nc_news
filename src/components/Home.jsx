import React, { Component } from "react";
import { getArticles } from "../Api";
import "../styling/App.css";
import NavButtons from "./NavButtons";
import Articles from "./Articles";
import LoadingBar from "./LoadingBar";
import { Link } from "@reach/router";
import HandleError from "./HandleError";
import SignIn from "./SignIn";

class Home extends Component {
  state = {
    p: 1,
    sort_by: null,
    order: null,
    topic: null,
    errStatus: false,
    isLoading: true,
    articles: [],
    loggedIn: this.props,
    username: this.props
  };

  componentDidMount() {
    const { p, sort_by, order, topic } = this.props;
    getArticles(p, sort_by, order, topic)
      .then(data =>
        this.setState({ articles: data.articles, isLoading: false })
      )
      .catch(err => {
        this.setState({
          errStatus: {
            message:
              err.response.data.message || "Sorry this page cannot be found",
            status: err.response.request.status || 400
          },
          replace: true
        });
      });
  }

  handlePageSubmit = inc => {
    const { p } = this.state;
    this.setState({ p: p + inc });
  };

  handleLogout = username => {
    this.setState({ username: username });
    localStorage.clear();
  };

  componentDidUpdate(prevProps, prevState) {
    const { p, sort_by, order } = this.state;
    const { topic } = this.props;

    if (prevState.p !== p || prevProps.topic !== topic) {
      getArticles(p, sort_by, order, topic)
        .then(data => this.setState({ articles: data.articles }))
        .catch(err => {
          this.setState({
            errStatus: {
              message:
                err.response.data.message || "Sorry this page cannot be found",
              status: err.response.request.status || 400
            },
            replace: true
          });
        });
    }
  }

  render() {
    const { articles, p, isLoading, errStatus } = this.state;
    const { topic, username } = this.props;

    if (isLoading) return <LoadingBar />;
    else if (errStatus) return <HandleError errStatus={errStatus} />;
    else if (!articles) {
      return <p>Sorry, there aren't any articles on this topic</p>;
    } else if (!window.localStorage.username) return <SignIn />;
    return (
      <div className="paper">
        <header className="Home-header">
          <h1 className="Home-title">NC News</h1>
          <h2 className="Welcome">Welcome to NC News {username}</h2>
        </header>
        <NavButtons />
        <div className="Logged-div">
          <h4 className="Logged-status">
            Logged in as:{" "}
            <Link to={`/user/${username}`} className="Single-user">
              {username}
            </Link>
          </h4>
          <button
            type="submit"
            onClick={() => this.handleLogout(username)}
            className="Logout-button"
          >
            Logout
          </button>
        </div>
        <Articles
          articles={articles}
          topic={topic}
          errStatus={errStatus}
          isLoading={isLoading}
        />
        <div className="Page-button">
          <button
            onClick={() => this.handlePageSubmit(-1)}
            disabled={this.state.p === 1 ? true : false}
          >
            &#171;
          </button>{" "}
          {p}{" "}
          <button
            onClick={() => this.handlePageSubmit(1)}
            disabled={this.state.p === 5 ? true : false}
          >
            &#187;
          </button>
        </div>
      </div>
    );
  }
}

Home.propTypes = {};

export default Home;
