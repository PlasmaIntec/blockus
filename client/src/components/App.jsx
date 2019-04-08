import React, { Component } from 'react';
import { render } from 'react-dom';

import Board from './Board.jsx';
import DraggablePiece from './DraggablePiece.jsx';
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
		this.onDragOverHandler = this.onDragOverHandler.bind(this);
		this.onDropHandler = this.onDropHandler.bind(this);
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
		const R = piece('r');
		placePiece(board, R, +row, +col);
		this.setState({ board: board });
	}

	onDragOverHandler(e) {
		e.preventDefault();
		return false;
	}	

	onDropHandler(e) {
		const { board } = this.state;
		const { row, col } = e.target.dataset;
		const R = piece('r', [['R']]);
    const id = event.dataTransfer.getData("text/id");
    const elem = document.getElementById(id);
		console.log(row, col)
		placePiece(board, R, +row, +col);
    elem.parentNode.removeChild(elem);
		this.setState({ board: board });
		e.preventDefault();
		return false;
	}

  render() {
  	const { width, height, board } = this.state;
  	return (
  		<div>
  			<Board
  				board={board}
  				onClickHandler={this.onClickHandler}
  				onDragOverHandler={this.onDragOverHandler}
  				onDropHandler={this.onDropHandler}
  			/>
  			<DraggablePiece />
  		</div>
  	)
  }
}