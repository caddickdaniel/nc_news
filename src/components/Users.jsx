import React, { Component } from "react";
import { getUsers } from "../Api";
import PostUser from "./PostUser";
import NavButtons from "./NavButtons";
import HandleError from "./HandleError";
import { Link } from "@reach/router";
import "../styling/App.css";

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
      if (isLoading)
        return (
          <div class="lds-ring">
            <div />
            <div />
            <div />
            <div />
          </div>
        );
      else if (errStatus) return <HandleError errStatus={errStatus} />;
      return (
        <div className="Users">
          <div style={userStyle}>
            <h2 className="User-name">{user.name} </h2>
            <div>
              <img
                className="Avatar-img"
                style={imgStyle}
                src="https://cdn-images-1.medium.com/max/1200/1*MccriYX-ciBniUzRKAUsAw.png"
                alt="Avatar"
              />
            </div>
            <Link to={`/user/${user.username}`}>
              <p className="User-username">Username:{user.username}</p>
            </Link>
          </div>
        </div>
      );
    });
    return (
      <div>
        <header className="Home-header">
          <h1 className="Home-title">NC News</h1>
          <h2 className="Home-title">Search Users</h2>
        </header>
        <NavButtons />
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
