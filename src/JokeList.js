import React, { Component } from "react";
import axios from "axios";
import "./JokeList.css";
import Joke from "./Joke";
import uuid from "uuid/v4";

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = { jokes: [] };

    this.handleVote = this.handleVote.bind(this);
  }

  static defaultProps = {
    numJokesToGet: 10
  };

  async componentDidMount() {
    let jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      let res = await axios.get(`https://icanhazdadjoke.com/`, {
        headers: { Accept: "application/json" }
      });
      jokes = [...jokes, { id: uuid(), text: res.data.joke, votes: 0 }];
    }
    this.setState({ jokes });
  }

  handleVote(id, delta) {
    this.setState(prevState => ({
      jokes: prevState.jokes.map(obj =>
        obj.id === id ? { ...obj, votes: obj.votes + delta } : obj
      )
    }));
  }

  render() {
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
          <button className="jokelist-getmore">New Jokes</button>
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
