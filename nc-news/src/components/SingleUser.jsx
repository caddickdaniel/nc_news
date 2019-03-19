import React, { Component } from "react";
import { getUsers } from "../Api";
import NavButtons from "./NavButtons";

class SingleUser extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    const { user } = this.props;
    // console.dir(username)
    getUsers(user).then(
      data => console.log(user) || this.setState({ user: data.user })
    );
  }

  render() {
    const capitalise = {
      textTransform: "capitalize",
      marginLeft: "1em"
    };

    return (
      <div>
        <header className="Home-header">
          <h1 className="Home-title">NC News</h1>
          <h2 style={capitalise}>{this.props.user}</h2>
          <hr />
          <hr />
        </header>
        <NavButtons />
        <hr />
        <h1 className="ArtText">{this.props.user}</h1>
        <h2>{this.props.user.name}</h2>
        <img src={this.props.user.avatar_url} alt="avatar" />
      </div>
    );
  }
}

export default SingleUser;
