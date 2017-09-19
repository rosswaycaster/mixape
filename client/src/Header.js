import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { observer, inject } from 'mobx-react';

import "./Header.scss";

@inject("UserStore")
@observer
class Header extends Component {
  constructor() {
    super();
  }

  logoutClicked() {
    axios('/api/user/logout')
    .then(() => {
      this.props.UserStore.reset();
    })
  }

  render() {
    return (
      <div className="Header">
        <Link className="logo" to="/">🙉 MixApe</Link>
        <div className="nav">
          {
            this.props.UserStore.user ? <Link to="/login" onClick={() => {this.logoutClicked()}}>Logout, {this.props.UserStore.user.username}</Link> : <Link to="/login">Login / Signup</Link>
          }
        </div>
      </div>
    )
  }
}

export default Header;
