import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "./JoinCreate.scss";

class JoinCreate extends Component {
  constructor() {
    super();
    this.state = {
      placeholder: ''
    }
  }

  componentWillMount() {
    fetch('/api/playlist/name')
      .then(result => result.json())
      .then(result => this.setState({placeholder: result.name}))
  }

  render() {
    return (
      <div className="JoinCreate">
        <div className="wrapper">
          <input placeholder={this.state.placeholder} type="text"/>
          <br />
          <button className="join">Join</button>
          <button className="create">Create</button>
        </div>
      </div>
    )
  }
}

export default JoinCreate;
