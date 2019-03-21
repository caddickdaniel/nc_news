import React, { Component } from "react";
import { getComments } from "../Api";
import axios from "axios";
import { navigate } from "@reach/router";
import { url } from "../Api";
import Voting from "./Voting";

class Comments extends Component {
  state = {
    comments: [],
    username: "grumpy19",
    didDelete: 0
  };

  componentDidMount() {
    // console.dir(this.props)
    // if(this.props.location.href.includes('comments')) {
    //   return document.getElementById('#comments').focus();
    // }
    const { article_id } = this.props;
    getComments(article_id).then(data =>
      this.setState({ comments: data.comments })
    );
  }

  handleDelete = event => {
    const { article_id } = this.props;
    const { comment_id } = this.state.comments;

    event.preventDefault();

    axios.delete(`${url}comments/${comment_id}`).then(({ data }) => {
      if (comment_id) {
        this.setState(({ didDelete }) => {
          return { didDelete: didDelete + 1 };
        });
      }
      navigate(`/articles/${article_id}`);
    });
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
              <form onSubmit={() => this.handleDelete(comment.comment_id)}>
                <button type="submit">Delete Post</button>
              </form>
            )}
          </div>
          <p style={authorVoteStyle}>User: {comment.author}</p>
          <p style={authorVoteStyle}>
            <Voting
              votes={comment.votes}
              comment_id={comment.comment_id}
              article_id={comment.article_id}
            />
          </p>
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
