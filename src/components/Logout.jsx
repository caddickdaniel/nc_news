import React from "react";

handleLogout = username => {
  this.setState({ username: username });
  localStorage.clear();
};

export default function Logout() {
  const { username } = this.props;
  return (
    <div className="Logged-div">
      <h4 className="Logged-status">Logged in as: {username}</h4>
      <button
        type="submit"
        onClick={() => this.handleLogout(username)}
        className="Logout-button"
      >
        Logout
      </button>
    </div>
  );
}
