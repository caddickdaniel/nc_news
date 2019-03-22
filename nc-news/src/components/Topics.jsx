import React, { Component } from "react";
import { getTopics } from "../Api";
import { Link } from "@reach/router";
import PostTopic from "./PostTopic";
import NavButtons from "./NavButtons";
import Error from "./Error";

export class Topics extends Component {
  state = {
    topics: [],
    errStatus: false,
    isLoading: true
  };

  componentDidMount() {
    console.log("component mounted!");
    getTopics()
      .then(data => this.setState({ topics: data.topics, isLoading: false }))
      .catch(err => {
        console.dir(err) ||
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
    const { isLoading, errStatus } = this.state;
    const topicItems = this.state.topics.map(topic => {
      return (
        <div className="Topics">
          <Link to={`/articles/topic/${topic.slug}`}>
            <h2 className="Topic-slug">{topic.slug}</h2>
          </Link>
          <div>
            <p>Description: {topic.description}</p>
          </div>
          <hr />
        </div>
      );
    });
    console.log(topicItems);
    if (isLoading) return <p>Loading...</p>;
    else if (errStatus) return <Error errStatus={errStatus} />;
    return (
      <div>
        <header className="Home-header">
          <h1 className="Home-title">NC News</h1>
          <h2 className="Home-title">Search Topics</h2>
          <hr />
          <hr />
        </header>
        <NavButtons />
        <hr />
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
