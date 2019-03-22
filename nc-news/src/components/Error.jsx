import React, { Component } from "react";

class Error extends Component {
  render() {
    const { errStatus } = this.props;

    return (
      <div>
        <h1>Error</h1>
        <p>{(errStatus && errStatus.message) || "Page not found"} </p>
        <p>Status:{(errStatus && errStatus.status) || 404}</p>
      </div>
    );
  }
}

export default Error;
