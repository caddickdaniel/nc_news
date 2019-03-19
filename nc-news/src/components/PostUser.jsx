import React, { Component } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import { url } from "../Api";

class PostUser extends Component {
  state = {
    username: "",
    avatar_url: "",
    name: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    console.log(name, value);
    this.setState(state => ({ ...state, [name]: value }));
  };

  handleUserSubmit = event => {
    event.preventDefault();

    const post = {
      username: this.state.username,
      avatar_url: this.state.avatar_url,
      name: this.state.name
    };
    // console.log(this.state)
    axios.post(`${url}users`, { ...post }).then(({ data }) => {
      console.log(post);
      navigate(`/users`);
    });
  };

  render() {
    //   console.log(this.props)
    const userStyle = {
      textAlign: "center"
    };
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
