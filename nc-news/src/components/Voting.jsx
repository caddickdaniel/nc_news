import React, { Component } from "react";
import axios from "axios";
import { url } from "../Api";
import Error from "./Error";

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

      const { data } = axios.patch(voteUrl, {
        inc_votes: inc
      });
    };

    if (comment_id) {
      voteInc(article_id, comment_id, inc);
    } else voteInc(article_id, comment_id, inc);
    this.setState(state => ({
      voteChange: state.voteChange + inc
    })).catch(err => {
      this.setState({
        errStatus: {
          message:
            err.response.data.message || "Sorry this task cannot be completed",
          status: err.response.request.status || 400
        },
        replace: true
      });
    });
  };

  render() {
    const { votes } = this.props;
    const { voteChange, errStatus } = this.state;

    const voteButton = {
      textAlign: "center"
    };

    if (errStatus) return <Error errStatus={errStatus} />;

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
