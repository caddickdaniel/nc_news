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
    console.log(name, value);
    this.setState(state => ({ ...state, [name]: value }));
  };

  handlePostSubmit = event => {
    event.preventDefault();
    //what do you want to send
    const post = {
      title: this.state.title,
      topic: this.state.topic,
      body: this.state.body,
      author: "grumpy19"
    };
    console.log(post);
    axios.post(`${url}articles`, { ...post }).then(({ data }) => {
      console.log(data);
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
          <hr />
          <hr />
        </header>
        <NavButtons />
        <div style={postStyle}>
          <h2>Add Article</h2>
          <form onSubmit={this.handlePostSubmit}>
            <div>
              <label>Title: </label>
              <br />
              <input
                type="text"
                name="title"
                onChange={this.handleChange}
                value={this.state.title}
              />
            </div>
            <br />
            <div>
              <label>Topic: </label>
              <br />
              <input
                type="text"
                name="topic"
                onChange={this.handleChange}
                value={this.state.topic}
              />
            </div>
            <br />
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
      </div>
    );
  }
}

export default PostArticle;
