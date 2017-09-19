import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { observer, inject } from "mobx-react";

import "./LoginRegister.scss";

@inject("UserStore")
@observer
class LoginRegister extends Component {
  constructor() {
    super();
    this.state = {
      err: ''
    }
  }

  componentWillMount() {
    if (this.props.location.state && this.props.location.state.err) {
      this.setState({
        err: this.props.location.state.err
      })
    }
  }

  loginClicked() {
    axios.post('/api/user/login', {
      username: this.refs.username.value,
      password: this.refs.password.value,
    }).then((res) => {
      this.props.UserStore.set(res.data);
      this.props.history.push('/');
    }).catch((err) => {
      console.log(err);
      if (err.response.status === 401){
        this.setState({
          err: err.response.data.err
        })
      } else {
        console.log(err.response)
      }
    });
  }

  signupClicked() {
    axios.post('/api/user/signup', {
      username: this.refs.username.value,
      password: this.refs.password.value,
    }).then((res) => {
      this.props.UserStore.set(res.data);
      this.props.history.push('/');
    }).catch((err) => {
      console.log(err);
      if (err.response.status === 401){
        this.setState({
          err: err.response.data.err
        })
      } else {
        console.log(err.response)
      }
    });
  }

  render() {
    return (
      <div className="LoginRegister">
        <div className="error">{this.state.err}</div>
        <div className="wrapper">
          <input placeholder="username" type="text" ref="username"/>
          <input placeholder="password" type="password" ref="password"/>
          <button className="login" onClick={() => {this.loginClicked()}}>Join</button>
          <button className="signup" onClick={() => {this.signupClicked()}}>Signup</button>
        </div>
      </div>
    )
  }
}

export default LoginRegister;
