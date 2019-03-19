import Articles from "./Articles";
import NavButtons from "./NavButtons";
import React, { Component } from "react";

class ArticleSearch extends Component {
  state = {
    p: this.props,
    sort_by: null,
    order: null
  };

  handleChange = event => {
    const { name, value } = event.target;
    console.log(name, value);
    this.setState(state => ({ ...state, [name]: value }));
  };

  handleQuerySubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="Home">
        <header className="Home-header">
          <h1 className="Home-title">NC News</h1>
          <h2 className="Home-title">Search Articles</h2>
          <hr />
          <hr />
        </header>
        <NavButtons />
        <hr />
        <div>
          <form onSubmit={this.handleQuerySubmit}>
            <p>Sort:</p>
            <select name="sort" id="sort" onChange={this.handleChange}>
              <option value="created">Created</option>
              <option value="article_id">Article ID</option>
              <option value="title">Title</option>
              <option value="topic">Topic</option>
              <option value="votes">Votes</option>
              <option value="author">Author</option>
            </select>
            <p>Order:</p>
            <select name="order" id="order" onChange={this.handleChange}>
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div />
        <div className="Post-article" />
        <Articles sort={this.state.sort} order={this.state.order} />
        <div className="Page-button">
          <button>{"<<<"}</button> 1 <button>{">>>"}</button>
        </div>
      </div>
    );
  }
}

export default ArticleSearch;
