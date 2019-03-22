import React, { Component } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import { url } from "../Api";
import Error from "./Error";

class PostTopic extends Component {
  state = {
    description: "",
    slug: "",
    errStatus: false
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
    axios
      .post(`${url}topics`, { ...post })
      .then(({ data }) => {
        //   console.log(data)
        navigate("/topics");
      })
      .catch(err => {
        console.dir(err) ||
          this.setState({
            errStatus: {
              message:
                err.response.data.message ||
                "Sorry you entered an incorrect format",
              status: err.response.request.status || 400
            },
            replace: true
          });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    const { description, slug } = this.state;

    if (prevState.slug !== slug || prevState.description !== description) {
      //I want to render all the topics including newest
    }
  }

  render() {
    //   console.log(this.props)
    const topicStyle = {
      textAlign: "center"
    };
    const { errStatus } = this.state;

    if (errStatus) return <Error errStatus={errStatus} />;
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
