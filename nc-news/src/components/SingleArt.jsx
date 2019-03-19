import React, { Component } from "react";
import { getSingleArticle } from "../Api";
import Comments from "./Comments";
import { Link } from "@reach/router";
import axios from "axios";
import { navigate } from "@reach/router";
import PostComment from "./PostComment";
import { url } from "../Api";
import NavButtons from "./NavButtons";

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
    const { article_id } = this.props;
    event.preventDefault();
    axios.delete(`${url}articles/${article_id}`).then(({ data }) => {
      navigate("/articles");
    });
  };

  render() {
    console.dir(this.props);
    const { article, username } = this.state;
    const { article_id } = this.props;
    const { comment_id } = this.props;

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

    const voteButton = {
      textAlign: "center"
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
          <NavButtons />
        </header>

        <Link to={`/articles/topic/${article.topic}`}>
          <h2 style={topicStyling}>{article.topic}</h2>
        </Link>
        <h3 style={topicStyling}>{article.title}</h3>
        <small style={authStyle}> Author: {article.author}</small>
        <div style={deleteButton}>
          {this.state.username === article.author && (
            <form onSubmit={() => this.handleDelete(article.article_id)}>
              <button type="submit">Delete Post</button>
            </form>
          )}
        </div>
        <p style={bodyStyling}>{article.body}</p>
        <hr />
        <div style={voteButton}>
          <button>&#9650;</button> Votes: {article.votes}{" "}
          <button>&#9660;</button>{" "}
        </div>
        <br />
        <div>
          <Comments article_id={article_id} comment_id={comment_id} />
        </div>
        <div>
          <PostComment article_id={article_id} />
        </div>
      </div>
    );
  }
}

export default SingleArt;
