import React from "react";
import { Link } from "@reach/router";
import "../styling/App.css";

export default function NavButtons(article, topic, user) {
  return (
    <div className="Nav-Alignment">
      <Link to="/home">
        <button className="Nav-Button1">Home</button>
      </Link>
      <Link to="/topics">
        <button className="Nav-Button2">Topics</button>
      </Link>
      <Link to="/users">
        <button className="Nav-Button3">Users</button>
      </Link>
    </div>
  );
}
