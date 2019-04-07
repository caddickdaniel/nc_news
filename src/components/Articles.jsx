import React, { Component } from "react";
import { Link } from "@reach/router";
import "../styling/App.css";
import LoadingBar from "./LoadingBar";
import QuerySelector from "./QuerySelector";
import { getArticles } from "../Api";

export class Articles extends Component {
  handleChange = event => {
    const { name, value } = event.target;
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

  render() {
    const { articles, topic, isLoading } = this.props;
    const articleItems = articles.map(article => {
      return (
        <div className="Articles" key={article.article_id}>
          <Link to={`/articles/${article.article_id}`}>
            <h2 className="Article-title">{article.title}</h2>
          </Link>
          <div>
            <Link to={`/articles/topic/${article.topic}`}>
              <p className="Author">Topic: {article.topic}</p>
            </Link>
            <Link to={`/user/${article.author}`}>
              <p className="Author">Author: {article.author}</p>
            </Link>
            <p className="Created-text">
              Created:{" "}
              {article.created_at.slice(0, 19).replace(/[a-zA-Z]/, " At: ")}
            </p>
          </div>
          <p className="Article-body">{article.body.slice(0, 250)}...</p>
          <small>
            <Link to={`/articles/${article.article_id}#comments`}>
              {" "}
              <p className="Comments">Comments: {article.comment_count} </p>
            </Link>
          </small>{" "}
        </div>
      );
    });
    if (isLoading) return <LoadingBar />;
    return (
      <div>
        <div className="Query-Post-Bar">
          {topic ? (
            <h1 className="Home-text">Articles on {topic}</h1>
          ) : (
            <h1 className="Home-text">Articles</h1>
          )}
          <QuerySelector
            handleChange={this.handleChange}
            handleQuerySubmit={this.handleQuerySubmit}
          />
        </div>
        {articleItems}
      </div>
    );
  }
}

export default Articles;
