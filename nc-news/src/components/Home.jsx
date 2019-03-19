import React, { Component } from "react";
import Articles from "./Articles";
import "../styling/App.css";
import { Link } from "@reach/router";

class Home extends Component {
  state = {
    username: "",
    page: 1,
    errStatus: false
  };

  // handlePageSubmit = (inc, event) => {
  //   event.preventDefault()
  //   const {page} = this.state
  //   this.setState({page: (page + inc)})
  // }

  render() {
    const postStyle = { float: "right" };
    const { page } = this.state;

    return (
      <div className="Home">
        <header className="Home-header">
          <h1 className="Home-title">NC News</h1>
          <h2 className="Welcome">Welcome to NC News {this.props.username}</h2>
          <hr />
          <hr />
        </header>
        <div>
          <Link to="/home">
            <button>Home</button>
          </Link>
          <Link to="/articles">
            <button>Articles </button>
          </Link>
          <Link to="/topics">
            <button>Topics</button>
          </Link>
          <Link to="/users">
            <button>Users</button>
          </Link>
          <Link to="/postarticle">
            <button style={postStyle}>Post Article</button>
          </Link>
          <hr />
        </div>
        <Articles page={page} />
        <div className="Page-button">
          <button type="submit">&#171;</button> 1{" "}
          <button type="submit">&#187;</button>
          {/* onSubmit={this.handlePageSubmit(-1)} */}
          {/* onSubmit={this.handlePageSubmit(1)} */}
        </div>
      </div>
    );
  }
}

Home.propTypes = {};

export default Home;
