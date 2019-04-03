import React, { Component } from 'react';
import { render } from 'react-dom';

import Board from './Board.jsx';
// TODO: REFACTOR USING REDUX
import { 
	piece, 
	genBoard, 
	placePiece
} from '../gameLogic';

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
		const board = genBoard(width, height);
		board[-1] = { '-1': 'R' };
		this.setState({ board: board });
	} 

	onClickHandler(e) {
		const { board } = this.state;
		const { row, col } = e.target.dataset;
		// const piece = [[0, 0], [0, 1], [1, 0], [1, 1]];
		// piece.forEach(loc => {
		// 	var c = loc[0] + +col, r = loc[1] + +row;
		// 	if (board[r] && !!(board[r][c] !== undefined)) {
		// 		// ensure the change is within board boundary
		// 		board[r][c] = 'r';
		// 	}
		// })
		const R = piece('r');
		placePiece(board, R, +row, +col);
		this.setState({ board: board });
	}

  render() {
  	const { width, height, board } = this.state;
  	return (
  		<div>
  			<Board
  				board={board}
  				onClickHandler={this.onClickHandler}
  			/>
  		</div>
  	)
  }
}