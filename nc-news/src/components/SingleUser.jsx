import React, { Component } from "react";
import { getUsers } from "../Api";
import NavButtons from "./NavButtons";
import Error from "./Error";

class SingleUser extends Component {
  state = {
    user: {},
    errStatus: false
  };

  componentDidMount() {
    const { user } = this.props;

    getUsers(user)
      .then(data => this.setState({ user: data.user }))
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

    if (errStatus) return <Error errStatus={errStatus} />;

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
