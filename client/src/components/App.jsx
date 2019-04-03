import React, { Component } from 'react';
import { render } from 'react-dom';

import Board from './Board.jsx';
// TODO: REFACTOR USING REDUX

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			width: 5,
			height: 5,
			board: null
		}
		this.generateBoard = this.generateBoard.bind(this);
		this.onClickHandler = this.onClickHandler.bind(this);
	}

	componentDidMount() {		
		this.generateBoard();
	}

	generateBoard() {
  	const { width, height } = this.state;
		var board = Array(height).fill(0);
		board = board.map(() => Array(width).fill(0));
		this.setState({ board: board })
	} 

	onClickHandler(e) {
		const { board } = this.state;
		const { row, col } = e.target.dataset;
		const piece = [[0, 0], [0, 1], [1, 0], [1, 1]];
		piece.forEach(loc => {
			var c = loc[0] + +col, r = loc[1] + +row;
			if (board[r] && !!(board[r][c] !== undefined)) {
				// ensure the change is within board boundary
				board[r][c] = 'r';
			}
		})
		this.setState({ board: board });
	}

  render() {
  	const { width, height, board } = this.state;
  	return (
  		<div>
  			YOU MADE IT
  			<Board
  				board={board}
  				onClickHandler={this.onClickHandler}
  			/>
  		</div>
  	)
  }
}