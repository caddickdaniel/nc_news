import React, { Component } from "react";
import { getComments } from "../Api";
import Voting from "./Voting";
import { deleteItem } from "../Api";

class Comments extends Component {
  state = {
    comments: [],
    username: "grumpy19",
    didDelete: 0,
    comment: {}
  };

  componentDidMount() {
    const { article_id } = this.props;
    getComments(article_id).then(data =>
      this.setState({ comments: data.comments })
    );
  }

  handleDelete = event => {
    const { comment_id } = this.state.comments;
    //need to pass handleDelete the comment_id, undefined at the moment
    event.preventDefault();
    console.log(this.event);
    deleteItem(comment_id)
      .then(data => this.setState({ comments: data.comments }))
      .catch(err => console.log(err));
  };

  componentDidUpdate(prevProps, prevState) {
    const { article_id } = this.props;

    if (prevState.didDelete !== this.state.didDelete) {
      getComments(article_id);
    }
  }

  render() {
    const authorVoteStyle = {
      textAlign: "center"
    };

    const bodyStyle = {
      margin: "60px",
      textAlign: "center"
    };

    const commTitle = {
      textAlign: "center"
    };

    const deleteButton = {
      textAlign: "center"
    };

    const commentItems = this.state.comments.map(comment => {
      return (
        <div>
          <hr />
          <h3 style={bodyStyle}>{comment.body}</h3>
          <div style={deleteButton}>
            {this.state.username === comment.author && (
              <form onSubmit={this.handleDelete}>
                <button type="submit">Delete Post</button>
              </form>
            )}
          </div>
          <p style={authorVoteStyle}>User: {comment.author}</p>
          <Voting
            votes={comment.votes}
            comment_id={comment.comment_id}
            article_id={comment.article_id}
          />
          <hr />
        </div>
      );
    });
    return (
      <div id="#comments">
        <hr />
        <h2 style={commTitle}>Comments</h2>
        {commentItems}
      </div>
    );
  }
}

export default Comments;
