import React, { Component } from "react";
import { getUsers } from "../Api";
import PostUser from "./PostUser";
import NavButtons from "./NavButtons";
import Error from "./Error";
import { Link } from "@reach/router";

export class Users extends Component {
  state = {
    users: [],
    isLoading: true,
    errStatus: false
  };

  componentDidMount() {
    getUsers()
      .then(data => this.setState({ users: data.users, isLoading: false }))
      .catch(err => {
        this.setState({
          errStatus: {
            message:
              err.response.data.message || "Sorry, this page cannot be found",
            status: err.response.request.status || 400
          },
          replace: true
        });
      });
  }

  render() {
    const { isLoading, errStatus } = this.state;
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
      if (isLoading) return <p>Loading...</p>;
      else if (errStatus) return <Error errStatus={errStatus} />;
      return (
        <div className="Users">
          <div style={userStyle}>
            <h2 className="User-name">Name: {user.name} </h2>
            <div>
              <img
                style={imgStyle}
                src="https://cdn-images-1.medium.com/max/1200/1*MccriYX-ciBniUzRKAUsAw.png"
                alt="Avatar"
              />
            </div>
            <Link to={`/user/${user.username}`}>
              <p>Username:{user.username}</p>
            </Link>
          </div>
          <hr />
        </div>
      );
    });
    return (
      <div>
        <header className="Home-header">
          <h1 className="Home-title">NC News</h1>
          <h2 className="Home-title">Search Users</h2>
          <hr />
        </header>
        <hr />
        <NavButtons />
        <hr />
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
