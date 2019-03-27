import React, { Component } from "react";
import { getTopics } from "../Api";
import { Link } from "@reach/router";
import PostTopic from "./PostTopic";
import NavButtons from "./NavButtons";
import HandleError from "./HandleError";
import "../styling/App.css";

export class Topics extends Component {
  state = {
    topics: [],
    errStatus: false,
    isLoading: true
  };

  componentDidMount() {
    getTopics()
      .then(data => this.setState({ topics: data.topics, isLoading: false }))
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.topics !== this.state.topics) {
      getTopics()
        .then(data => this.setState({ topics: data.topics }))
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
    const topicItems = this.state.topics.map(topic => {
      return (
        <div className="Topics-container">
          <div className="paper">
            <Link to={`/articles/topic/${topic.slug}`}>
              <h2 className="Topic-slug">{topic.slug}</h2>
            </Link>
            <div>
              <p className="Topic-description">
                Description: {topic.description}
              </p>
            </div>
          </div>
        </div>
      );
    });
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
      <div className="paper">
        <header className="Home-header">
          <h1 className="Home-title">NC News</h1>
          <h2 className="Home-title">Search Topics</h2>
        </header>
        <NavButtons />
        <h1 className="ArtText">Topics</h1>
        {topicItems}
        <div>
          <PostTopic />
        </div>
      </div>
    );
  }
}

export default Topics;
