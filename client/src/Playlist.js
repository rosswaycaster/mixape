import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "./Playlist.scss";

class Playlist extends Component {
  constructor(props) {
    super();

    this.id = props.match.params.id;
    this.history = props.history;
  }

  componentWillMount(){
    if (this.id !== 'id') {
      this.history.push('/');
    }
  }

  render() {
    return (
      <div>
        Playlist: {this.id}
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    )
  }
}

export default Playlist;
