import React, { Component } from "react";
import { voteChange } from "./Api";

class Voting extends Component {
  state = {
    voteChange: 0
  };

  addVote = inc => {
    const { article_id, comment_id } = this.props;
    console.log(this.props);
    if (comment_id) {
      voteChange(article_id, comment_id, inc);
    } else voteChange(article_id, comment_id, inc);
    this.setState(state => ({
      voteChange: state.voteChange + inc
    }));
  };

  render() {
    const { votes } = this.props;

    const { voteChange } = this.state;
    return (
      <div>
        <button onClick={() => this.addVote(1)} disabled={voteChange === 1}>
          &#9660;
        </button>
        <p>Votes:{votes + voteChange}</p>
        <button onClick={() => this.addVote(-1)} disabled={voteChange === -1}>
          &#9650;
        </button>
      </div>
    );
  }
}

export default Voting;
