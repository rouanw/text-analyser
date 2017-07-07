import React, { Component } from 'react';
import autoBind from 'react-autobind';
import retext from 'retext';
import _find from 'lodash/find';

class VFile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    autoBind(this);
  }

  flattenParsers(parsers) {
    return parsers.reduce((flattened, parser) => `${flattened}${parser.name},`, '');
  }

  componentWillReceiveProps({ input, parsers }) {
    if (input === this.props.input && this.flattenParsers(parsers) === this.flattenParsers(this.props.parsers)) {
      return;
    };
    const parser = parsers.reduce((result, parser) => result.use(parser), retext());
    parser.process(input, (err, file) => {
      this.setState({ file });
    });
  }
  
  getMessage(index, file) {
    return _find(file.messages, (message) => message.location.start.offset === index);
  }

  wholeIssue(message, file) {
    return file.contents.slice(message.location.start.offset, message.location.end.offset);
  }

  markUpIssue(message, file) {
    return `<span class="issue issue__${message.source}" title="${message.message}">${this.wholeIssue(message, file)}</span>`;
  }

  parse(file) {
    let nextCharIndex = 0;
    let output = '';
    while (nextCharIndex < file.contents.length) {
      const nextChar = file.contents[nextCharIndex];
      const message = this.getMessage(nextCharIndex, file);
      if (message) {
        output += this.markUpIssue(message, file);
        nextCharIndex = message.location.end.offset;
      } else {
        output += nextChar;
        nextCharIndex++;
      }
    }
    return output;
  }
  
  output(file) {
    if (!file) {
      return { __html: `<span>Type something in the box above.</span>` };
    }
    return { __html: this.parse(file) };
  }

  render() {
    return (
      <div id="result" className="output" dangerouslySetInnerHTML={this.output(this.state.file)} />
    );
  }
}

export default VFile;
