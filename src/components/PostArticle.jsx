import React, { Component } from "react";
import { postArticle } from "../Api";
import NavButtons from "./NavButtons";
import SignIn from "./SignIn";

class PostArticle extends Component {
  state = {
    title: "",
    topic: "",
    body: ""
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState(state => ({ ...state, [name]: value }));
  };

  handlePostSubmit = event => {
    event.preventDefault();

    const post = {
      title: this.state.title,
      topic: this.state.topic,
      body: this.state.body,
      author: this.props.username
    };
    postArticle(post);
  };

  render() {
    const postStyle = {
      textAlign: "center"
    };

    if (!window.localStorage.username) return <SignIn />;
    return (
      <div className='paper'>
        <header className="Home-header">
          <h1 className="Home-title">NC News</h1>
          <h2 className="Welcome">Post an article</h2>
        </header>
        <NavButtons />
        <div style={postStyle}>
          <h2>Add Article</h2>
          <form onSubmit={this.handlePostSubmit}>
            <div>
              <label>Title: </label>
              <input
                type="text"
                name="title"
                onChange={this.handleChange}
                value={this.state.title}
              />
            </div>
            <div>
              <label>Topic: </label>
              <input
                type="text"
                name="topic"
                onChange={this.handleChange}
                value={this.state.topic}
              />
            </div>
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
      </div>
    );
  }
}

export default PostArticle;
