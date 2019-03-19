import React from "react";
import { Link } from "@reach/router";

export default function NavButtons() {
  const postStyle = { float: "right" };
  return (
    <div>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <Link to="/articles">
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
  );
}
