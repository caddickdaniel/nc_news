import React, { Component } from "react";
import { getArticles } from "../Api";
import "../styling/App.css";
import NavButtons from "./NavButtons";
import QuerySelector from "./QuerySelector";
import Articles from "./Articles";
import { Link } from "@reach/router";

class Home extends Component {
  state = {
    username: this.state,
    p: 1,
    sort_by: null,
    order: null,
    topic: null,
    errStatus: false,
    isLoading: true,
    articles: []
  };

  componentDidMount() {
    const { p, sort_by, order, topic } = this.props;
    console.log("component mounted!");
    getArticles(p, sort_by, order, topic)
      .then(data => this.setState({ articles: data.articles }))
      .catch(err => {
        this.setState({ errStatus: true });
      });
  }

  //MOUNTS THE ARTICLES IN DEFAULT ORDER

  handlePageSubmit = (inc, event) => {
    event.preventDefault();
    const { p } = this.state;
    this.setState({ p: p + inc });
  };

  //HANDLES SETTING STATE OF PAGE INCREMENTS

  handleChange = event => {
    const { name, value } = event.target;
    console.log(name, value);
    this.setState(state => ({ ...state, [name]: value }));
  };

  //HANDLES CHANGE OF DROP DOWN

  componentDidUpdate(prevProps, prevState) {
    const { p, sort_by, order } = this.state;
    const { topic } = this.props;

    if (prevState.p !== p || prevProps.topic !== topic) {
      getArticles(p, sort_by, order, topic)
        .then(data => this.setState({ articles: data.articles }))
        .catch(err => {
          this.setState({ errStatus: true });
        });
    }
  }

  //UPDATES ARTICLES WITH NEW PAGE NUMBER FROM STATE

  render() {
    const { articles } = this.state;
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
        <QuerySelector />
        <Articles articles={articles} />
        <div className="Page-button">
          <button
            type="submit"
            onSubmit={() => this.handlePageSubmit(-1)}
            disabled={this.state.p === 1 ? true : false}
          >
            &#171;
          </button>{" "}
          1{" "}
          <button type="submit" onSubmit={() => this.handlePageSubmit(1)}>
            &#187;
          </button>
        </div>
      </div>
    );
  }
}

Home.propTypes = {};

export default Home;
