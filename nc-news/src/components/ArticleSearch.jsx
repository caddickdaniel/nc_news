import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import Articles from "./Articles";

function ArticleSearch(props) {
  const postStyle = { float: "right" };
  const dropDown1 = { textAlign: "left" };

  return (
    <div className="Home">
      <header className="Home-header">
        <h1 className="Home-title">NC News</h1>
        <h2 className="Home-title">Search Articles</h2>
        <hr />
        <hr />
      </header>
      <div>
        <Link to="/home">
          <button>Home</button>
        </Link>
        <Link to="/home">
          <button>Articles</button>
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
      </div>
      <hr />
      <div style={dropDown1}>
        <p>Sort:</p>
        <select name="SortBy" id="sortby">
          <option value="created">Created</option>
          <option value="article_id">Article ID</option>
          <option value="title">Title</option>
          <option value="topic">Topic</option>
          <option value="votes">Votes</option>
          <option value="author">Author</option>
        </select>
        <p>Order:</p>
        <select name="SortBy" id="sortby">
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>
      <div />
      <div className="Post-article" />
      <Articles />
      <div className="Page-button">
        <button>{"<<<"}</button> 1 <button>{">>>"}</button>
      </div>
    </div>
  );
}

ArticleSearch.propTypes = {};

export default ArticleSearch;
