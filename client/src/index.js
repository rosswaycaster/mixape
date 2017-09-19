import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "mobx-react";

import UserStore from './store/UserStore';

import App from './App';
import './index.scss';

class Root extends React.Component {
  render(){
    return (
      <Provider UserStore={new UserStore()}>
        <App />
      </Provider>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
