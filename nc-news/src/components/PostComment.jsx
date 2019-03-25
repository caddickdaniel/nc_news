import React, { Component } from "react";
import { postComment } from "../Api";

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
    const { article_id, optimisticPostRender } = this.props;
    const post = {
      body: this.state.body,
      author: this.props.username
      //can I access window.localstorage for this value?
    };
    postComment(article_id, post);
    optimisticPostRender(post);
  };

  render() {
    const commentStyle = {
      textAlign: "center"
    };
    return (
      <div style={commentStyle}>
        <h2>Add Comment</h2>
        <form onSubmit={this.handleCommentSubmit}>
          <div>
            <label>Body: </label>
            <textarea
              name="body"
              onChange={this.handleChange}
              value={this.state.body}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default PostComment;
