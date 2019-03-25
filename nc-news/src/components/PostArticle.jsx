import React, { Component } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import { url } from "../Api";
import NavButtons from "./NavButtons";

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
      //need to find a way of accessing author, can I access window.localstorage for this value?
    };

    axios.post(`${url}articles`, { ...post }).then(({ data }) => {
      navigate(`/articles/${data.article.article_id}`);
    });
  };

  render() {
    const postStyle = {
      textAlign: "center"
    };
    return (
      <div>
        <header className="Home-header">
          <h1 className="Home-title">NC News</h1>
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
