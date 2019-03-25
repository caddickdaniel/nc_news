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

    this.setState(state => ({ ...state, [name]: value }));
  };

  handleTopicSubmit = event => {
    event.preventDefault();

    const post = {
      slug: this.state.slug,
      description: this.state.description
    };

    axios
      .post(`${url}topics`, { ...post })
      .then(({ data }) => {
        navigate("/topics");
      })
      .catch(err => {
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
    }
  }

  render() {
    const { errStatus } = this.state;

    if (errStatus) return <Error errStatus={errStatus} />;
    return (
      <div>
        <h2 className="Post-Topic-Title">Add Topic</h2>
        <form onSubmit={this.handleTopicSubmit}>
          <div>
            <label className="Slug-label">Slug: </label>
            <input
              className="Slug-input"
              name="slug"
              onChange={this.handleChange}
              value={this.state.slug}
            />
          </div>
          <div>
            <label className="Desc-label">Description: </label>
            <textarea
              className="Desc-input"
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
            />
          </div>
          <button type="submit" className="Topic-submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default PostTopic;
