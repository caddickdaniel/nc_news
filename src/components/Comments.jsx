import React, { Component } from "react";
import { getComments } from "../Api";
import Voting from "./Voting";
import { deleteItem } from "../Api";
import PostComment from "./PostComment";

class Comments extends Component {
  state = {
    comments: [],
    didDelete: 0
  };

  optimisticPostRender(post) {
    const { comments } = this.state;
    comments.push(post);
  }

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

    const { article_id, username } = this.props;
    const { comments } = this.state;

    const commentItems = this.state.comments.map(comment => {
      return (
        <div>
          <h3 style={bodyStyle}>{comment.body}</h3>
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
          <p style={authorVoteStyle}>User: {comment.author}</p>
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
