import React, { Component } from "react";
import axios from "axios";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";
import url from "../Api";

class PostComment extends Component {
  state = {
    body: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    console.log(name, value);
    this.setState(state => ({ ...state, [name]: value }));
  };

  handleCommentSubmit = event => {
    event.preventDefault();

    const { article_id } = this.props;

    const post = {
      body: this.state.body,
      author: "grumpy19"
    };
    // console.log(this.state)
    axios
      .post(`${url}articles/${article_id}/comments`, { ...post })
      .then(({ data }) => {
        //   console.log(data)
        navigate(`/articles/${article_id}`);
      });
  };

  render() {
    //   console.log(this.props)
    const commentStyle = {
      textAlign: "center"
    };
    return (
      <div style={commentStyle}>
        <h2>Add Comment</h2>
        <form onSubmit={this.handleCommentSubmit}>
          <div>
            <label>Body: </label>
            <br />
            <textarea
              name="body"
              onChange={this.handleChange}
              value={this.state.body}
            />
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default PostComment;
