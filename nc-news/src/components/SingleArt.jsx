import React, { Component } from "react";
import { getSingleArticle } from "../Api";
import Comments from "./Comments";
import { Link } from "@reach/router";
import axios from "axios";
import { navigate } from "@reach/router";
import PostComment from "./PostComment";
import { url } from "../Api";
import NavButtons from "./NavButtons";
import Voting from "./Voting";

class SingleArt extends Component {
  state = {
    article: {},
    username: "grumpy19"
  };

  componentDidMount() {
    const { article_id } = this.props;

    getSingleArticle(article_id).then(data =>
      this.setState({ article: data.article })
    );
  }

  handleDelete = event => {
    const { article_id } = this.state.article;
    event.preventDefault();
    axios
      .delete(`${url}articles/${article_id}`)
      .then(({ data }) => {
        navigate("/home");
      })
      .catch(err => console.log(err));
  };

  render() {
    const { article } = this.state;
    const { article_id } = this.props;
    const { comment_id } = this.props;
    console.log(comment_id);

    const bodyStyling = {
      margin: "50px",
      marginBottom: "20px",
      textIndent: "2em",
      marginTop: "10px",
      fontSize: "120%"
    };

    const topicStyling = {
      textTransform: "capitalize",
      margin: "40px",
      marginBottom: "10px",
      fontSize: "175%"
    };

    const authStyle = {
      margin: "50px",
      marginBottom: "20px",
      textIndent: "2em",
      marginTop: "10px"
    };

    const deleteButton = {
      marginLeft: "3em"
    };

    return (
      <div>
        <header className="Home-header">
          <h1 className="Home-title">NC News</h1>
          <hr />
          <hr />
          <NavButtons />
          <hr />
        </header>

        <Link to={`/articles/topic/${article.topic}`}>
          <h2 style={topicStyling}>{article.topic}</h2>
        </Link>
        <h3 style={topicStyling}>{article.title}</h3>
        <small style={authStyle}> Author: {article.author}</small>
        <div style={deleteButton}>
          {this.state.username === article.author && (
            <form onSubmit={this.handleDelete}>
              <button type="submit">Delete Post</button>
            </form>
          )}
        </div>
        <p style={bodyStyling}>{article.body}</p>
        <hr />
        <Voting votes={article.votes} article_id={article_id} />
        <br />
        <div>
          <Comments article_id={article_id} comment_id={comment_id} />
        </div>
      </div>
    );
  }
}

export default SingleArt;
