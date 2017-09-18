import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Header from './Header';
import LoginRegister from './LoginRegister';
import JoinCreate from './JoinCreate';
import Playlist from './Playlist';

import './App.scss';

const RedirectHome = () => {
  return (
    <Redirect to={{
        pathname: '/',
    }}/>
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {

  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="content">
            <Route exact path="/" component={JoinCreate}/>
            <Route exact path="/login" component={LoginRegister}/>
            <Route path="/playlist/:id" component={Playlist}/>
            <Route exact path="/playlist" component={RedirectHome}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
