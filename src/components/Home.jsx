import React, { Component } from "react";
import { getArticles } from "../Api";
import "../styling/App.css";
import NavButtons from "./NavButtons";
import QuerySelector from "./QuerySelector";
import Articles from "./Articles";
import { Link, navigate } from "@reach/router";
import HandleError from "./HandleError";

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
    console.log("page submit init");
    this.setState({ p: p + inc });
  };

  handleChange = event => {
    const { name, value } = event.target;
    console.log(name, value);
    this.setState(state => ({ ...state, [name]: value }));
  };

  handleQuerySubmit = event => {
    const { p, sort_by, order } = this.state;

    event.preventDefault();

    getArticles(p, sort_by, order)
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
  };

  handleLogout = username => {
    this.setState({ username: null });
    window.localStorage.setItem("username", username);
    navigate("/");
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

    const postStyle = {
      float: "right",
      fontSize: "90%",
      position: "relative",
      right: "150px",
      top: "30px"
    };
    if (isLoading)
      return (
        <div className="lds-ring">
          <div />
          <div />
          <div />
          <div />
        </div>
      );
    else if (errStatus) return <HandleError errStatus={errStatus} />;
    else if (!articles) {
      return <p>Sorry, there aren't any articles on this topic</p>;
    }
    return (
      <div className="Home">
        <header className="Home-header">
          <h1 className="Home-title">NC News</h1>
          <h2 className="Welcome">Welcome to NC News {username}</h2>
          <p>Logged in as: {username}</p>
          <button type="submit" onClick={() => this.handleLogout(username)}>
            Logout
          </button>
        </header>
        <NavButtons />

        <QuerySelector
          handleChange={this.handleChange}
          handleQuerySubmit={this.handleQuerySubmit}
        />
        <Link to="/postarticle">
          <button style={postStyle}>Post Article</button>
        </Link>
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
          {p} <button onClick={() => this.handlePageSubmit(1)}>&#187;</button>
        </div>
      </div>
    );
  }
}

Home.propTypes = {};

export default Home;
