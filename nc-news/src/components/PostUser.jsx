import React, { Component } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import { url } from "../Api";
import Error from "./Error";

class PostUser extends Component {
  state = {
    username: "",
    avatar_url: "",
    name: "",
    errStatus: false
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState(state => ({ ...state, [name]: value }));
  };

  handleUserSubmit = event => {
    event.preventDefault();

    const post = {
      username: this.state.username,
      avatar_url: this.state.avatar_url,
      name: this.state.name
    };

    axios
      .post(`${url}users`, { ...post })
      .then(({ data }) => {
        navigate(`/users`);
      })
      .catch(err => {
        this.setState({
          errStatus: {
            message:
              err.response.data.message ||
              "Sorry this task cannot be completed",
            status: err.response.request.status || 400
          },
          replace: true
        });
      });
  };

  render() {
    const userStyle = {
      textAlign: "center"
    };
    const { errStatus } = this.state;

    if (errStatus) return <Error errStatus={errStatus} />;
    return (
      <div style={userStyle}>
        <h2>Add User</h2>
        <form onSubmit={this.handleUserSubmit}>
          <div>
            <label>Username: </label>
            <br />
            <input
              name="username"
              onChange={this.handleChange}
              value={this.state.username}
            />
          </div>
          <div>
            <label>Avatar URL: </label>
            <br />
            <input
              name="avatar_url"
              onChange={this.handleChange}
              value={this.state.avatar_url}
            />
          </div>
          <div>
            <label>Name: </label>
            <br />
            <input
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default PostUser;
