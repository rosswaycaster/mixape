import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "./JoinCreate.scss";

class JoinCreate extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="JoinCreate">
        <div className="wrapper">
          <input placeholder="hello" type="text"/>
          <br />
          <button className="join">Join</button>
          <button className="create">Create</button>
        </div>
      </div>
    )
  }
}

export default JoinCreate;
