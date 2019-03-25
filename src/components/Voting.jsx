import React, { Component } from "react";
import axios from "axios";
import { url } from "../Api";
import HandleError from "./HandleError";

class Voting extends Component {
  state = {
    voteChange: 0,
    errStatus: false
  };

  addVote = inc => {
    const { article_id, comment_id } = this.props;

    const voteInc = (article_id, comment_id, inc) => {
      const voteUrl = comment_id
        ? `${url}comments/${comment_id}`
        : `${url}articles/${article_id}`;

      axios.patch(voteUrl, {
        inc_votes: inc
      });
    };

    if (comment_id) {
      voteInc(article_id, comment_id, inc);
    } else voteInc(article_id, comment_id, inc);
    this.setState(state => ({
      voteChange: state.voteChange + inc
    }));
  };

  render() {
    const { votes } = this.props;
    const { voteChange, errStatus } = this.state;

    const voteButton = {
      textAlign: "center"
    };

    if (errStatus) return <HandleError errStatus={errStatus} />;

    return (
      <div style={voteButton}>
        <button onClick={() => this.addVote(1)} disabled={voteChange === 1}>
          &#9650;
        </button>
        Votes:{votes + voteChange}
        <button onClick={() => this.addVote(-1)} disabled={voteChange === -1}>
          &#9660;
        </button>
      </div>
    );
  }
}

export default Voting;
