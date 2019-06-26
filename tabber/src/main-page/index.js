import React, { Component } from 'react';
import Editor from '../editor/Editor'
import MenuHamburger from './MenuHamburger/MenuHamburger';
import './App.css';

//Editor will need a prop passed to it that loads up a tab selected from my tabs.

class App extends Component {
  
  render() {
    return (
      <div> 
        <MenuHamburger/>
          <Editor /> 
      </div>
    );
  }
}

export default App;
