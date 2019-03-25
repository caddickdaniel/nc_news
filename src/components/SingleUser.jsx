import React, { Component } from "react";
import { getUsers } from "../Api";
import NavButtons from "./NavButtons";
import HandleError from "./HandleError";

class SingleUser extends Component {
  state = {
    user: {},
    errStatus: false,
    articles: []
  };

  componentDidMount() {
    const { user } = this.props;

    getUsers(user)
      .then(data => console.log(data) || this.setState({ user: data.user }))
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

  render() {
    const capitalise = {
      textTransform: "capitalize",
      marginLeft: "1em"
    };
    const { errStatus } = this.state;

    if (errStatus) return <HandleError errStatus={errStatus} />;

    return (
      <div>
        <header className="Home-header">
          <h1 className="Home-title">NC News</h1>
          <h2 style={capitalise}>{this.state.user.username}</h2>
        </header>
        <NavButtons />
        <h1 className="ArtText">{this.state.user.username}</h1>
        <h2>{this.state.user.name}</h2>
        <img src={this.state.user.avatar_url} alt="avatar" />
      </div>
    );
  }
}

export default SingleUser;
