import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import "./TrackList.scss";

class TrackList extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="TrackList">
        {
          this.props.tracks.map((video) => {
            video = JSON.parse(video.data);
            console.log(video)
            return (
              <div className="result" key={video.id.videoId}>
                <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                <div className="info">
                  <div className="title">{video.snippet.title}</div>
                  <div className="channel">{video.snippet.channelTitle}</div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default TrackList;
