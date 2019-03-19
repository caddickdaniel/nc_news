import React, { Component } from "react";
import { getUsers } from "./Api";
import { Link } from "@reach/router";

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
        <Link to="/home">
          <button>Home</button>
        </Link>
        <Link to="/articles">
          <button>Articles</button>
        </Link>
        <Link to="/topics">
          <button>Topics</button>
        </Link>
        <Link to="/users">
          <button>Users</button>
        </Link>
        <hr />
        <h1 className="ArtText">{this.props.user}</h1>
        <h2>{this.props.user.name}</h2>
        <img src={this.props.user.avatar_url} alt="avatar" />
      </div>
    );
  }
}

export default SingleUser;
