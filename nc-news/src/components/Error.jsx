import React, { Component } from "react";

class Error extends Component {
  render() {
    const { errStatus } = this.props;
    console.dir(errStatus);
    return (
      <div>
        <h1>Error</h1>
        <p>Status:{errStatus}</p>
      </div>
    );
  }
}

export default Error;

/*ERROR NOTES:

*/
