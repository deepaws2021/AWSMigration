import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';
import './css/App.css';
import './css/bootstrap.min.css';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import Layout from './Layout.js';

const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
        <Layout/>
        </div>
      </Provider>
    );
  }
}

export default App;
