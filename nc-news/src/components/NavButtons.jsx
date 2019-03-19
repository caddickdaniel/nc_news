import React from "react";
import { Link } from "@reach/router";

export default function NavButtons(article, topic, user) {
  return (
    <div>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <Link to="/topics">
        <button>Topics</button>
      </Link>
      <Link to="/users">
        <button>Users</button>
      </Link>
    </div>
  );
}
