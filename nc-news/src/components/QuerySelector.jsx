import React, { Component } from "react";

export default class QuerySelector extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.handleQuerySubmit}>
          <p>Sort:</p>
          <select name="sort_by" id="sort_by" onChange={this.handleChange}>
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
    );
  }
}
