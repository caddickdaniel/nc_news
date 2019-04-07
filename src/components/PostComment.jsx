import React, { Component } from "react";
import { postComment } from "../Api";
import "../styling/App.css";

class PostComment extends Component {
  state = {
    body: ""
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState(state => ({ ...state, [name]: value }));
  };

  handleCommentSubmit = event => {
    event.preventDefault();
    const { article_id } = this.props;
    const post = {
      body: this.state.body,
      author: this.props.username
    };
    postComment(article_id, post);
  };

  render() {
    const commentStyle = {
      textAlign: "center"
    };
    return (
      <div style={commentStyle}>
        <h2 className="Add-comment">Add Comment</h2>
        <form onSubmit={this.handleCommentSubmit}>
          <div>
            <label className="Add-comment-text">Body: </label>
            <textarea
              className="Add-comment-body"
              name="body"
              onChange={this.handleChange}
              value={this.state.body}
            />
          </div>
          <button type="submit" className="Add-comment-submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default PostComment;
