import React, { Component } from "react";
import { Link } from "@reach/router";

import "../styling/App.css";

export default class QuerySelector extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleQuerySubmit} className="QueryForm">
          <p className="Sort-DropText">Sort:</p>
          <select
            className="Sort-DropDown"
            name="sort_by"
            id="sort_by"
            onChange={this.props.handleChange}
          >
            <option value="created_at">Created</option>
            <option value="title">Title</option>
            <option value="topic">Topic</option>
            <option value="votes">Votes</option>
            <option value="author">Author</option>
          </select>
          <p className="Order-DropText">Order:</p>
          <select
            name="order"
            id="order"
            onChange={this.props.handleChange}
            className="Order-DropDown"
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
          <button type="submit" className="DropSubmit">
            Submit
          </button>
        </form>
        <Link to="/postarticle">
          <button className="Post-article">Post Article</button>
        </Link>
      </div>
    );
  }
}
