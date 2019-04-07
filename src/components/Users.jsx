import React, { Component } from "react";
import { getUsers } from "../Api";
import PostUser from "./PostUser";
import NavButtons from "./NavButtons";
import HandleError from "./HandleError";
import { Link } from "@reach/router";
import LoadingBar from "./LoadingBar";
import SignIn from "./SignIn";
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.users !== this.state.users) {
      getUsers()
        .then(data => this.setState({ users: data.users }))
        .catch(err => {
          this.setState({
            errStatus: {
              message:
                err.response.data.message || "Sorry this page cannot be found",
              status: err.response.request.status || 400
            },
            replace: true
          });
        });
    }
  }

  render() {
    const { isLoading, errStatus } = this.state;

    const imgStyle = {
      borderRadius: "50%",
      height: "10%",
      width: "10%",
      marginBottom: "-10px"
    };

    const userItems = this.state.users.map(user => {
      if (isLoading) return <LoadingBar />;
      else if (errStatus) return <HandleError errStatus={errStatus} />;
      return (
        <div className="User-container">
          <div className="User-style">
            <h2 className="User-name">{user.name} </h2>
            <div className="Avatar-img">
              <img style={imgStyle} src={user.avatar_url} alt="Avatar" />
            </div>
            <Link to={`/user/${user.username}`}>
              <p className="User-username">Username:{user.username}</p>
            </Link>
          </div>
        </div>
      );
    });
    if (isLoading) return <LoadingBar />;
    else if (!window.localStorage.username) return <SignIn />;
    return (
      <div className="paper">
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
