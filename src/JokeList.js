import React, { Component } from "react";
import axios from "axios";
import "./JokeList.css";
import Joke from "./Joke";
import uuid from "uuid/v4";

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
      loading: false
    };

    this.handleVote = this.handleVote.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  static defaultProps = {
    numJokesToGet: 10
  };

  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.getJokes();
    }
  }

  async getJokes() {
    let jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      let res = await axios.get(`https://icanhazdadjoke.com/`, {
        headers: { Accept: "application/json" }
      });
      jokes = [...jokes, { id: uuid(), text: res.data.joke, votes: 0 }];
    }
    this.setState(
      prevState => ({
        loading: false,
        jokes: [...prevState.jokes, ...jokes]
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }

  handleVote(id, delta) {
    this.setState(
      prevState => ({
        jokes: prevState.jokes.map(obj =>
          obj.id === id ? { ...obj, votes: obj.votes + delta } : obj
        )
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }

  handleClick() {
    this.setState({ loading: true }, this.getJokes);
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="jokelist-spinner">
          <i className="fa fa-8x fa-laugh fa-spin"></i>
          <h1 className="jokelist-title">Loading ...</h1>
        </div>
      );
    }
    return (
      <div className="jokelist">
        <div className="jokelist-sidebar">
          <h1 className="jokelist-title">
            <span>Dad</span> Jokes
          </h1>
          <img
            src="http://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt="happy emoticon"
          />
          <button onClick={this.handleClick} className="jokelist-getmore">
            New Jokes
          </button>
        </div>

        <div className="jokelist-jokes">
          {this.state.jokes.map((obj, index) => (
            <Joke
              key={obj.id}
              text={obj.text}
              votes={obj.votes}
              upvote={() => this.handleVote(obj.id, 1)}
              downvote={() => this.handleVote(obj.id, -1)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
