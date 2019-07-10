import React, { Component } from 'react';

class Joke extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="joke">
        <div className="joke-buttons">
          <span>{this.props.vote}</span>
        </div>
        <div className="joke-text">
          {this.props.text}
        </div>
      </div>
    );
  }
}

export default Joke;