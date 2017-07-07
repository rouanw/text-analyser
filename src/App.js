import React, { Component } from 'react';
import autoBind from 'react-autobind';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
    autoBind(this);
  }
  
  update (event) {
    this.setState({ input: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="wrapper">
          <textarea id="input" className="txt" onChange={this.update}></textarea>
          <div id="result" className="output">{this.state.input}</div>
        </div>
      </div>
    );
  }
}

export default App;
