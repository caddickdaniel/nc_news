import React, { Component } from "react";
import { getSingleArticle, deleteArticle } from "../Api";
import Comments from "./Comments";
import { Link } from "@reach/router";
import HandleError from "./HandleError";
import NavButtons from "./NavButtons";
import Voting from "./Voting";
import "../styling/App.css";

class SingleArt extends Component {
  state = {
    article: {},
    errStatus: false
  };

  componentDidMount() {
    const { article_id } = this.props;

    getSingleArticle(article_id)
      .then(data => this.setState({ article: data.article }))
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

  handleDelete = event => {
    const { article_id } = this.state.article;
    event.preventDefault();
    deleteArticle(article_id).catch(err => console.log(err));
  };

  render() {
    const { article } = this.state;
    const { article_id, comment_id } = this.props;

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

    const { username } = this.props;
    const { errStatus } = this.state;

    if (errStatus) return <HandleError errStatus={errStatus} />;
    return (
      <div className="paper">
        <header className="Home-header">
          <h1 className="Home-title">NC News</h1>
          <Link to={`/articles/topic/${article.topic}`}>
            <h2 className="Topic-title">{article.topic}</h2>
          </Link>
        </header>
        <NavButtons />

        <div className="Single-art-container">
          <h3 style={topicStyling}>{article.title}</h3>
          <Link to={`/user/${article.author}`}>
            <small style={authStyle} className="Single-user">
              {" "}
              Author: {article.author}
            </small>
          </Link>
          <div style={deleteButton}>
            {username === article.author && (
              <form onSubmit={this.handleDelete}>
                <button type="submit">Delete Post</button>
              </form>
            )}
          </div>
          <p className="Body-Styling">{article.body}</p>
          <Voting votes={article.votes} article_id={article_id} />
        </div>

        <div>
          <Comments
            article_id={article_id}
            comment_id={comment_id}
            username={username}
          />
        </div>
      </div>
    );
  }
}

export default SingleArt;
