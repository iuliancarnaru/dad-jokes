import React, { Component } from "react";
import "./Joke.css";
class Joke extends Component {
  getColor() {
    if (this.props.votes >= 15) {
      return "#4caf50";
    } else if (this.props.votes >= 12) {
      return "#8bc34a";
    } else if (this.props.votes >= 9) {
      return "#cddc39";
    } else if (this.props.votes >= 6) {
      return "#ffeb3b";
    } else if (this.props.votes >= 3) {
      return "#ffc107";
    } else if (this.props.votes >= 0) {
      return "#ff9800";
    } else {
      return "#f44336";
    }
  }

  getEmoji() {
    if (this.props.votes >= 15) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (this.props.votes >= 12) {
      return "em em-laughing";
    } else if (this.props.votes >= 9) {
      return "em em-smiley";
    } else if (this.props.votes >= 6) {
      return "em em-slightly_smiling_face";
    } else if (this.props.votes >= 3) {
      return "em em-neutral_face";
    } else if (this.props.votes >= 0) {
      return "em em-confused";
    } else {
      return "em em-angry";
    }
  }

  render() {
    return (
      <div className="joke">
        <div className="joke-buttons">
          <i className="fas fa-arrow-up" onClick={this.props.upvote} />
          <span style={{ borderColor: this.getColor(), transition: 'all .2s ease-in-out' }} className="joke-votes">
            {this.props.votes}
          </span>
          <i className="fas fa-arrow-down" onClick={this.props.downvote} />
        </div>
        <div className="joke-text">{this.props.text}</div>
        <div className="joke-smiley">
          <i style={{transition: 'all .2s ease-in-out'}} className={this.getEmoji()} />
        </div>
      </div>
    );
  }
}

export default Joke;
