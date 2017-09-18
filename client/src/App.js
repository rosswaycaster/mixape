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
    this.state = {
      name: ''
    };
  }

  componentWillMount() {
    fetch('/api/hello')
      .then(res => res.json())
      .then(result => {
        this.setState({
          name: result.name
        });
      });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <Route exact path="/" component={JoinCreate}/>
          <Route exact path="/login" component={LoginRegister}/>
          <Route path="/playlist/:id" component={Playlist}/>
          <Route exact path="/playlist" component={RedirectHome}/>
        </div>
      </Router>
    );
  }
}

export default App;
