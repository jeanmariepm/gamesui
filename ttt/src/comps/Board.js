import React, { Component } from "react";
import Square from "./Square";
import square from "./Square";

class Board extends Component {
  state = {
    squares: Array(9).fill(":"),
    winner: "Z",
  };

  resetBoard = () => {
    this.setState({
      squares: Array(9).fill(":"),
      winner: "Z",
    });
  };

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.clickHandler(i)}
      />
    );
  }

  clickHandler = (i) => {
    let winner = this.state.winner;
    if (winner !== "Z") {
      console.log(`Disabling clickHandler as winner is ${winner}`);
      return;
    }
    const squares = this.state.squares.slice();
    squares[i] = "X";

    winner = this.calculateWinner(squares);
    if (winner !== "X") {
      console.log(`calling goetAIAction for ${squares}`);
      let action = this.getAIAction(squares);
      squares[action] = "O";
      console.log(` ... dine with goetAIAction board now is ${squares}`);
    } else {
      console.log(`X must be the ${winner}`);
    }
    winner = this.calculateWinner(squares);
    if (winner !== "Z") {
      winner = winner === "X" ? "You" : "AI";
    }

    this.setState({
      squares: squares,
      winner: winner,
    });
  };

  getAIAction = (squares) => {
    // return center or top-left in first AI move
    if (squares.filter((s) => s === "X").length === 1) {
      if (squares[4] === ":") {
        return 4;
      } else if (squares[0] === ":") {
        return 0;
      }
    }
    // use minmax algorithm
    // find action with least value by choosing opp's action with highest value
    let [next_val, action] = this.minmax(squares, "O");
    console.log(`getAIAction Got ${next_val} ${action} from minmax`);
    if (action == null) {
      action = squares.findIndex((s) => s === ":");
    }
    return action;
  };

  minmax = (s, player, depth = 0) => {
    let squares = s.slice();
    let next_val = 0;
    let action = -1;
    const best_val = player === "X" ? 1 : -1;
    const next_player = player === "X" ? "O" : "X";

    // pick a winning/loss-avoiding move if one exist
    squares.forEach((element, index) => {
      if (element === ":" && next_val !== best_val) {
        [player, next_val].forEach((cplayer) => {
          squares[index] = cplayer;
          if (this.calculateWinner(squares) === cplayer) {
            console.log(`${cplayer} wins at ${index} with board ${squares}`);
            next_val = best_val;
            action = index;
          }
        });
        squares[index] = ":";
      }
    });

    // pick the best remaining
    if (next_val !== 0) {
      let [cnext_val, caction] = [next_val, action];
      squares.forEach((element, index) => {
        if (element === ":") {
          squares[index] = player;
          [next_val, action] = this.minmax(
            squares,
            (player = player === "X" ? "O" : "X"),
            (depth = depth + 1)
          );
          if (next_val === -best_val) {
            [cnext_val, caction] = [next_val, action];
          } else if (next_val === 0) {
            [cnext_val, caction] = [next_val, action];
          }
          squares[index] = ":";
        }
      });
      [next_val, action] = [cnext_val, caction];
    }
    return [next_val, action];
  };

  calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] !== ":" &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return "Z";
  };

  render() {
    const winner = this.state.winner;
    console.log(`rendering winner is ${winner}`);
    let status;
    if (winner !== "Z") {
      status = `Winner: ${winner}`;
      console.log(`rendering winnerstatus is ${status}`);
    } else {
      status = `Next player: You`;
      console.log(`rendering next status is ${status}`);
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="board-row">
          <button className="btn btn-primary" onClick={this.resetBoard}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default Board;
