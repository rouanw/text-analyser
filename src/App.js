import React, { Component } from 'react';
import autoBind from 'react-autobind';
import simplify from 'retext-simplify';
import logo from './logo.svg';
import VFile from './VFile';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { output: '' };
    autoBind(this);
  }
  
  update (event) {
    this.setState({ output: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Text analyser</h2>
        </div>
        <div className="wrapper">
          <div className="content">
            <textarea id="input" className="txt" onChange={this.update}></textarea>
            <VFile input={this.state.output} parsers={[simplify]} />
          </div>
          <div className="context">
            Choose your parsers:
            (coming soon)
          </div>
        </div>
      </div>
    );
  }
}

export default App;
