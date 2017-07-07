import React, { Component } from 'react';
import autoBind from 'react-autobind';
import retext from 'retext';
import simplify from 'retext-simplify';
import logo from './logo.svg';
import VFile from './VFile';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.parser = retext().use(simplify);
    this.state = { output: '' };
    autoBind(this);
  }
  
  update (event) {
    this.parser.process(event.target.value, (err, vfile) => {
      this.setState({ output: vfile });
    });
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
          <VFile file={this.state.output}/>
        </div>
      </div>
    );
  }
}

export default App;
