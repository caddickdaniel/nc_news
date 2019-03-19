import React, { Component } from "react";
import Articles from "./Articles";
import "../styling/App.css";
import NavButtons from "./NavButtons";

class Home extends Component {
  state = {
    username: this.state,
    page: 1,
    errStatus: false,
    isLoading: true
  };

  handlePageSubmit = (inc, event) => {
    event.preventDefault();
    const { page } = this.state;
    if (page === 1 && inc === -1) {
      this.setState({ page: 1 });
    } else this.setState({ page: page + inc });
    console.log(this.state);
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;

    if (prevState.page !== page) {
    }
  }

  render() {
    const { page, username } = this.state;

    return (
      <div className="Home">
        <header className="Home-header">
          <h1 className="Home-title">NC News</h1>
          <h2 className="Welcome">Welcome to NC News {this.props.username}</h2>
          <hr />
          <hr />
        </header>
        <NavButtons />
        <Articles page={page} username={username} />
        <div className="Page-button">
          <button type="submit" onSubmit={() => this.handlePageSubmit(-1)}>
            {/* disalbed=if page num = 1 */}
            &#171;
          </button>{" "}
          1{" "}
          <button type="submit" onSubmit={() => this.handlePageSubmit(1)}>
            &#187;
          </button>
        </div>
      </div>
    );
  }
}

Home.propTypes = {};

export default Home;
