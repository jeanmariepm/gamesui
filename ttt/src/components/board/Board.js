import React, { Component } from "react";
import Square from "../square/Square";
import classes from "./Board.module.css";
import Game from "../../logic/Game";

class Board extends Component {
  state = {
    game: new Game(),
  };

  resetBoard = () => {
    this.setState({
      game: new Game(),
    });
  };

  renderSquare(i) {
    let dispVal = this.state.game.squares[i];
    dispVal = dispVal ? dispVal : ":";
    return <Square value={dispVal} onClick={() => this.clickHandler(i)} />;
  }

  clickHandler(i) {
    // const game = { ...this.state.gane };
    if (this.state.game.getWinner()) {
      console.log(`Disabling clickHandler as we have a winners `);
      return;
    }
    this.state.game.setAction("X", i);
    const action = this.state.game.getAIAction();
    console.log(`AI recommends: ${action}`);
    this.state.game.setAction("O", action);
    this.setState({
      game: this.state.game,
    });
  }

  render() {
    let status;
    if (this.state.game.isOver()) {
      status = "Game over: Tied";
    } else if (this.state.game.getWinner()) {
      status = `Winner: ${this.state.game.getWinner()}`;
    } else {
      status = `Next player: You`;
    }

    const resetStyle = {
      backgroundColor: "green",
      fontSize: "10px",
      borderRadius: "4px",
    };
    return (
      <div>
        <div>
          <p className={classes.Status}>{status}</p>
        </div>
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
          <button style={resetStyle} onClick={this.resetBoard}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default Board;
