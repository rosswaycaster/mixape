import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "./Header.scss";

class Header extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="Header">
        <Link className="logo" to="/">🙉 MixApe</Link>
        <div className="nav">
          <Link to="/login">Login / Register</Link>
        </div>
      </div>
    )
  }
}

export default Header;
