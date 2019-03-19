import React, { Component } from "react";
import { getArticles } from "../Api";
import { Link } from "@reach/router";
import NavButtons from "./NavButtons";

class ArticlesByTopic extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    const { topic } = this.props;
    getArticles(topic).then(data => this.setState({ articles: data.articles }));
  }

  render() {
    const articleItems = this.state.articles.map(article => {
      return (
        <div className="Articles" key={article.article_id}>
          <Link color="black" to={`/articles/${article.article_id}`}>
            <h2 className="Article-title">{article.title}</h2>
          </Link>
          <div className="Author">
            <p>Author: {article.author}</p>
            <p>Created: {Date(article.created_at).slice(0, 24)}</p>
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
    console.log(articleItems);
    return (
      <div>
        <header className="Home-header">
          <h1 className="Home-title">NC News</h1>
          <hr />
          <hr />
          <NavButtons />
        </header>
        <hr />
        <h1 className="ArtText">Articles on {this.props.topic}</h1>
        {articleItems}
      </div>
    );
  }
}

export default ArticlesByTopic;
