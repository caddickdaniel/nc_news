import React, { Component } from "react";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";

export class Articles extends Component {
  state = {
    errStatus: false,
    username: "grumpy19"
  };

  render() {
    const { errStatus } = this.state;
    const { articles, topic } = this.props;
    const articleItems = articles.map(article => {
      if (errStatus) return navigate("/error");
      else
        return (
          <div className="Articles" key={article.article_id}>
            <Link to={`/articles/${article.article_id}`}>
              <h2 className="Article-title">{article.title}</h2>
            </Link>
            <div className="Author">
              <Link to={`/articles/topic/${article.topic}`}>
                <p>Topic: {article.topic}</p>
              </Link>
              <Link to={`/user/${article.author}`}>
                <p>Author: {article.author}</p>
              </Link>
              <p>
                Created:{" "}
                {article.created_at.slice(0, 19).replace(/[a-zA-Z]/, " At: ")}
              </p>
            </div>
            <p className="Article-body">{article.body.slice(0, 250)}...</p>
            <hr />
            <small className="Comments">
              <Link to={`/articles/${article.article_id}#comments`}>
                {" "}
                Comments: {article.comment_count}{" "}
              </Link>
            </small>{" "}
            <hr />
          </div>
        );
    });
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
