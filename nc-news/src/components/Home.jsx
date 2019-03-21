import React, { Component } from "react";
import { getArticles, getUsers } from "../Api";
import "../styling/App.css";
import NavButtons from "./NavButtons";
import QuerySelector from "./QuerySelector";
import Articles from "./Articles";
import { Link } from "@reach/router";

class Home extends Component {
  state = {
    username: this.props,
    p: 1,
    sort_by: null,
    order: null,
    topic: null,
    errStatus: false,
    isLoading: true,
    articles: [],
    users: []
  };

  componentDidMount() {
    const { p, sort_by, order, topic } = this.props;
    console.log("component mounted!");
    getArticles(p, sort_by, order, topic)
      .then(getUsers())
      .then(data => this.setState({ articles: data.articles }))
      .catch(err => {
        this.setState({ errStatus: true });
      });
  }

  //MOUNTS THE ARTICLES AND USERS IN DEFAULT ORDER

  handlePageSubmit = inc => {
    const { p } = this.state;
    console.log("page submit init");
    this.setState({ p: p + inc });
  };

  //HANDLES SETTING STATE OF PAGE INCREMENTS

  handleChange = event => {
    const { name, value } = event.target;
    console.log(name, value);
    this.setState(state => ({ ...state, [name]: value }));
  };

  //HANDLES CHANGE OF DROP DOWN

  handleQuerySubmit = event => {
    const { p, sort_by, order } = this.state;
    console.log(sort_by, order);
    event.preventDefault();
    console.log("query submitting");
    getArticles(p, sort_by, order)
      .then(data => this.setState({ articles: data.articles }))
      .catch(err => {
        this.setState({ errStatus: true });
      });
  };

  //HANDLES QUERY SUBMIT

  componentDidUpdate(prevProps, prevState) {
    const { p, sort_by, order } = this.state;
    const { topic } = this.props;
    console.log(this.state);

    if (
      prevState.p !== p ||
      prevProps.topic !==
        topic /*||
      prevState.sort_by !== sort_by ||
      prevState.order !== order */
    ) {
      getArticles(p, sort_by, order, topic)
        .then(data => this.setState({ articles: data.articles }))
        .catch(err => {
          this.setState({ errStatus: true });
        });
    }
  }

  //UPDATES ARTICLES WITH NEW PAGE NUMBER FROM STATE

  render() {
    const { articles, p } = this.state;
    const { topic } = this.props;
    const postStyle = { float: "right" };
    return (
      <div className="Home">
        <header className="Home-header">
          <h1 className="Home-title">NC News</h1>
          <h2 className="Welcome">Welcome to NC News {this.props.username}</h2>
          <hr />
          <hr />
        </header>
        <NavButtons />
        <hr />
        <Link to="/postarticle">
          <button style={postStyle}>Post Article</button>
        </Link>
        <QuerySelector
          handleChange={this.handleChange}
          handleQuerySubmit={this.handleQuerySubmit}
        />
        <Articles articles={articles} topic={topic} />
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
