import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { observer, inject } from 'mobx-react';
import ReactPlayer from 'react-player';
import openSocket from 'socket.io-client';


import TrackList from './TrackList';
import YouTubeSearch from './YouTubeSearch';

import "./Playlist.scss";

const  socket = openSocket('/');

@inject("UserStore")
@observer
class Playlist extends Component {
  constructor(props) {
    super();

    this.slug = props.match.params.slug;
    this.history = props.history;

    this.state = {
      tracks: [],
      playlist: null,
      nowPlaying: '3tmd-ClpJxA'
    }
  }

  componentWillMount(){
    this.refreshTracks();

    //Socket Listeners
    socket.on(this.slug, (data) => {
      this.refreshTracks();
    });
  }

  refreshTracks() {
    axios.get('/api/playlist', {
      params: {slug: this.slug}
    }).then((res) => {
      var nowPlaying = this.state.nowPlaying;
      if (res.data.tracks[0]){
        var data = JSON.parse(res.data.tracks[0].data);
        nowPlaying = data.id.videoId;
      }
      console.log(res.data)
      this.setState({
        playlist: res.data.playlist,
        tracks: res.data.tracks,
        nowPlaying: nowPlaying
      })
    }).catch((err) => {
      console.log(err);
      if (err.response.status === 404){
        this.history.push({pathname: '/', state: {err: err.response.data.err}})
      } else {
        console.log(err.response)
      }
    })
  }

  playNext() {
    var trackToRemove = this.state.tracks[0];
    var tracks = this.state.tracks.splice(1, this.state.tracks.length);
    var nowPlaying = '';
    if (tracks.length) {
      var data = JSON.parse(tracks[0].data);
      if (data){
        nowPlaying = data.id.videoId
      }
    }
    this.setState({
      tracks: tracks,
      nowPlaying: nowPlaying
    });
    axios.delete('/api/playlist/track', {
      params: {
        _id: trackToRemove._id,
        playlist: this.state.playlist._id
      }
    }).then((res) => {
      console.log(res)
    })
  }

  render() {
    if (this.state.playlist && this.state.tracks){
      return (
        <div className="Playlist">
          <h1>{this.state.playlist.slug}</h1>
          <h3>{this.state.playlist.owner.username}</h3>
          {/* <pre>{JSON.stringify(this.state.playlist, null, 2)}</pre> */}
          <div className="split">
            <div className="left">
              {
                this.state.tracks.length ? (
                  <div className="wrapper">
                    <ReactPlayer className="player" controls={true} width='100%' height='100%' url={'https://www.youtube.com/embed/'+this.state.nowPlaying} onEnded={() => {this.playNext()}} playing />
                  </div>
                ) : <div className="noTracks">Add a track to begin!</div>
              }
              <TrackList tracks={this.state.tracks} />
            </div>
            <div className="right">
              <YouTubeSearch playlist={this.state.playlist} />
            </div>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default Playlist;
