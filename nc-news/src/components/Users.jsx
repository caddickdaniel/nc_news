import React, { Component } from "react";
import { getUsers } from "../Api";
import { Link } from "@reach/router";
import PostUser from "./PostUser";

export class Users extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    console.log("component mounted!");
    getUsers().then(data => this.setState({ users: data.users }));
  }

  render() {
    const postStyle = { float: "right", marginRight: "1em" };
    const userStyle = {
      marginLeft: "10em",
      marginRight: "40em"
    };
    const imgStyle = {
      borderRadius: "50%",
      height: "10%",
      width: "10%",
      marginBottom: "-10px"
    };

    const userItems = this.state.users.map(user => {
      return (
        <div className="Users">
          <div style={userStyle}>
            <h2 className="User-name">Name: {user.name} </h2>
            <p>
              <img
                style={imgStyle}
                src="https://cdn-images-1.medium.com/max/1200/1*MccriYX-ciBniUzRKAUsAw.png"
                alt="Avatar"
              />{" "}
              Username:{user.username}
            </p>
          </div>
          <hr />
        </div>
      );
    });
    // console.log(userItems);
    return (
      <div>
        <header className="Home-header">
          <h1 className="Home-title">NC News</h1>
          <h2 className="Home-title">Search Users</h2>
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
        <h1 className="ArtText">Users</h1>
        {userItems}
        <div>
          <PostUser />
        </div>
      </div>
    );
  }
}

export default Users;
