import React, { Component } from 'react';
import autoBind from 'react-autobind';
import simplify from 'retext-simplify';
import readability from 'retext-readability';
import profanities from 'retext-profanities';
import equality from 'retext-equality';
import repeatedWords from 'retext-repeated-words';
import _find from 'lodash/find';
import _reject from 'lodash/reject';
import _values from 'lodash/values';
import _map from 'lodash/map';
import logo from './logo.svg';
import VFile from './VFile';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.availableParsers = { simplify, profanities, equality, repeatedWords, readability };
    this.state = { output: '', parsers: _values(this.availableParsers) };
    autoBind(this);
  }
  
  update(event) {
    this.setState({ output: event.target.value });
  }

  parserSelected(name) {
    return Boolean(_find(this.state.parsers, { name }));
  }

  toggleParser(event) {
    const name = event.target.id;
    if (this.parserSelected(name)) {
      this.setState({ parsers: _reject(this.state.parsers, (p) => p.name === name) });
    } else {
      this.setState({ parsers: [].concat(this.state.parsers, this.availableParsers[name])});
    }
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
            <VFile input={this.state.output} parsers={this.state.parsers} />
          </div>
          <div className="context">
            Choose your parsers:
            <div>
              {
                _map(this.availableParsers, (parser) => {
                  return <div className="parser-option" key={parser.name}>
                    <input type="checkbox" id={parser.name} checked={this.parserSelected(parser.name)} onChange={this.toggleParser}/>
                    <label className={`issue issue__retext-${parser.name}`} htmlFor={parser.name}>{parser.name}</label>
                  </div>;
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
