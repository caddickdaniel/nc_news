import React, { Component } from "react";
import { getArticles } from "../Api";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";

export class Articles extends Component {
  state = {
    articles: [],
    errStatus: false,
    page: this.props,
    username: "grumpy19"
  };

  componentDidMount() {
    const { page } = this.props;
    console.log("component mounted!");
    getArticles(page)
      .then(data => this.setState({ articles: data.articles }))
      .catch(err => {
        this.setState({ errStatus: true });
      });
  }

  render() {
    const { errStatus } = this.state;
    const articleItems = this.state.articles.map(article => {
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
              {/* 2016-08-18T12:07:52.389Z */}
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
    // console.log(articleItems);
    return (
      <div>
        <h1 className="ArtText">Articles</h1>
        {articleItems}
      </div>
    );
  }
}

export default Articles;
