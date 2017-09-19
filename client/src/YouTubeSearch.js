import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';
import axios from 'axios';

import "./YouTubeSearch.scss";

@inject("UserStore")
@observer
class YouTubeSearch extends Component {
  constructor() {
    super();

    this.state = {
      results: []
    }

    this.searchYouTube = _.debounce(this.searchYouTube, 500);
  }

  addTrack(video) {
    let playlist_id = this.props.playlist._id;
    this.setState({
      results: []
    });
    this.refs.search.value = '';
    // console.log(video);
    axios.post('/api/playlist/track', {
      data: JSON.stringify(video),
      source: 'youtube',
      playlist: playlist_id
    }).then((res) => {
      console.log(res)
    })
  }

  searchYouTube() {
    let query = this.refs.search.value;
    axios('/api/search', { params: {query: query} })
    .then((res) => {
      console.log(res.data);
      this.setState({
        results: res.data
      })
    })
  }

  render() {
    if (this.props.UserStore.user){
      return (
        <div className="YouTubeSearch">

          <input type="text" ref="search" placeholder="Search YouTube" onKeyUp={() => {this.searchYouTube()}}/>
          <div className="results">
            {
              this.state.results.map((video) => {
                return (
                  <div className="result" key={video.id.videoId} onClick={() => {this.addTrack(video)}}>
                    <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} />
                    <div className="info">
                      <div className="title">{video.snippet.title}</div>
                      <div className="channel">{video.snippet.channelTitle}</div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    } else {
      return (
        <div className="pleaseLogin">Please login to add tracks.</div>
      )
    }
  }
}

export default YouTubeSearch;
