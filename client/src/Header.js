import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "./Header.scss";

class Header extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>Header
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login / Register</Link></li>
      </div>
    )
  }
}

export default Header;
