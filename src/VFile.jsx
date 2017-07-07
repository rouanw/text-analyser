import React, { Component } from 'react';
import autoBind from 'react-autobind';
import _find from 'lodash/find';

class VFile extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  
  getMessage(index, file) {
    return _find(file.messages, (message) => message.location.start.offset === index);
  }

  wholeIssue(message, file) {
    return file.contents.slice(message.location.start.offset, message.location.end.offset);
  }

  markUpIssue(message, file) {
    return `<span class="issue">${this.wholeIssue(message, file)}</span>`;
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
    const { file } = this.props;
    return (
      <div id="result" className="output" dangerouslySetInnerHTML={this.output(file)} />
    );
  }
}

export default VFile;
