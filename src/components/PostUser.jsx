import React, { Component } from "react";
import { postUser } from "../Api";
import HandleError from "./HandleError";

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

    postUser(post).catch(err => {
      this.setState({
        errStatus: {
          message:
            err.response.data.message || "Sorry this task cannot be completed",
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

    if (errStatus) return <HandleError errStatus={errStatus} />;
    return (
      <div style={userStyle}>
        <h2>Add User</h2>
        <form onSubmit={this.handleUserSubmit}>
          <div>
            <label>Username: </label>
            <input
              name="username"
              onChange={this.handleChange}
              value={this.state.username}
            />
          </div>
          <div>
            <label>Avatar URL: </label>
            <input
              name="avatar_url"
              onChange={this.handleChange}
              value={this.state.avatar_url}
            />
          </div>
          <div>
            <label>Name: </label>
            <input
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default PostUser;
