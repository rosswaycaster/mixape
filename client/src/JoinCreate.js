import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import "./JoinCreate.scss";

class JoinCreate extends Component {
  constructor() {
    super();
    this.state = {
      placeholder: '',
      err: ''
    }
  }

  componentWillMount() {

    if (this.props.location.state && this.props.location.state.err) {
      this.setState({
        err: this.props.location.state.err
      })
    }

    axios('/api/playlist/name')
      .then(res => this.setState({placeholder: res.data.name}));
  }

  createClicked() {
    let roomName = this.refs.textInput.value.trim() || this.state.placeholder;
    axios.post('/api/playlist', {
      slug: roomName
    }).then((res) => {
      console.log(res, res.status);
      this.props.history.push({pathname: '/playlist/'+roomName});
    }).catch((err) => {
      if (err.response.status === 401){
        this.props.history.push({pathname: '/login', state: {err : err.response.data.err}});
      } else {
        console.log(err.response)
      }
    });
  }

  joinClicked() {
    let roomName = this.refs.textInput.value.trim();
    if (roomName !== '') {
      axios.get('/api/playlist', {
        params: {slug: roomName}
      }).then((res) => {
        this.props.history.push({pathname: '/playlist/'+roomName});
      }).catch((err) => {
        if (err.response.status === 404){
          this.setState({err: err.response.data.err})
          this.refs.wrapper.className += ' wobble';
          setTimeout(() => {
            this.refs.wrapper.className = this.refs.wrapper.className.replace( ' wobble', '' );
          }, 1000);
        } else {
          console.log(err.response)
        }
      })
    } else {
      this.refs.wrapper.className += ' wobble';
      setTimeout(() => {
        this.refs.wrapper.className = this.refs.wrapper.className.replace( ' wobble', '' );
      }, 1000);
    }
  }

  render() {
    return (
      <div className="JoinCreate">
        <div className="error">{this.state.err}</div>
        <div className="wrapper" ref="wrapper">
          <input placeholder={this.state.placeholder} type="text" ref="textInput"/>
          <button className="join" onClick={() => {this.joinClicked()}}>Join</button>
          <button className="create" onClick={() => {this.createClicked()}}>Create</button>
        </div>
      </div>
    )
  }
}

export default JoinCreate;
