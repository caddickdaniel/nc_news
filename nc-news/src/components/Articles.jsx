import React, { Component } from "react";
import { Link } from "@reach/router";
import "../styling/App.css";

export class Articles extends Component {
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
            <p className="Author">
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
    if (isLoading)
      return (
        <div class="lds-ring">
          <div />
          <div />
          <div />
          <div />
        </div>
      );
    return (
      <div>
        {topic ? (
          <h1 className="ArtText">Articles on {topic}</h1>
        ) : (
          <h1 className="ArtText">Articles</h1>
        )}
        {articleItems}
      </div>
    );
  }
}

export default Articles;
