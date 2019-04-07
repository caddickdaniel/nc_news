import React, { Component } from "react";
import { getComments, deleteItem } from "../Api";
import Voting from "./Voting";
import PostComment from "./PostComment";
import "../styling/App.css";
import { Link } from "@reach/router";

class Comments extends Component {
  state = {
    comments: [],
    didDelete: 0
  };

  componentDidMount() {
    const { article_id } = this.props;
    getComments(article_id).then(data =>
      this.setState({ comments: data.comments })
    );
  }

  handleDelete = event => {
    const { id } = event.target;
    const { comments } = this.state;
    const updatedComments = comments.filter(comment => {
      return comment.comment_id !== +id;
    });
    deleteItem(id).catch(err => console.log(updatedComments));
    this.setState({ comments: updatedComments });
  };

  componentDidUpdate(prevProps, prevState) {
    const { article_id } = this.props;
    if (prevState.comments !== this.state.comments) {
      getComments(article_id)
        .then(data => this.setState({ comments: data.comments }))
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
  }

  render() {
    const authorVoteStyle = {
      textAlign: "center"
    };

    const commTitle = {
      textAlign: "center"
    };

    const deleteButton = {
      textAlign: "center"
    };

    const { article_id, username } = this.props;
    const { comments } = this.state;

    const commentItems = this.state.comments.map(comment => {
      return (
        <div>
          <h4 className="Comment-style">{comment.body}</h4>
          <div style={deleteButton}>
            {username === comment.author && (
              <button
                onClick={this.handleDelete}
                id={comment.comment_id}
                type="submit"
              >
                Delete Post
              </button>
            )}
          </div>
          <Link to={`/user/${comment.author}`}>
            <p style={authorVoteStyle} className="Single-user">
              User: {comment.author}
            </p>
          </Link>
          <Voting
            votes={comment.votes}
            comment_id={comment.comment_id}
            article_id={comment.article_id}
          />
        </div>
      );
    });
    return (
      <div>
        <div id="#comments">
          <h2 style={commTitle}>Comments</h2>
          {commentItems}
        </div>
        <div>
          <PostComment
            article_id={article_id}
            optimisticPostRender={this.optimisticPostRender}
            comments={comments}
            username={username}
          />
        </div>
      </div>
    );
  }
}

export default Comments;
