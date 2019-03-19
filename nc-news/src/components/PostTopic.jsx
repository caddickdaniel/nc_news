import React, { Component } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import url from "../Api";

class PostTopic extends Component {
  state = {
    description: "",
    slug: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    console.log(name, value);
    this.setState(state => ({ ...state, [name]: value }));
  };

  handleTopicSubmit = event => {
    event.preventDefault();

    const post = {
      slug: this.state.slug,
      description: this.state.description
    };
    // console.log(this.state)
    axios.post(`${url}topics`, { ...post }).then(({ data }) => {
      //   console.log(data)
      navigate(`/topics`);
    });
  };

  render() {
    //   console.log(this.props)
    const topicStyle = {
      textAlign: "center"
    };
    return (
      <div style={topicStyle}>
        <h2>Add Topic</h2>
        <form onSubmit={this.handleTopicSubmit}>
          <div>
            <label>Slug: </label>
            <br />
            <input
              name="slug"
              onChange={this.handleChange}
              value={this.state.slug}
            />
          </div>
          <div>
            <label>Description: </label>
            <br />
            <textarea
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
            />
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default PostTopic;
