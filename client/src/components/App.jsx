import React, { Component } from 'react';
import { render } from 'react-dom';

import Board from './Board.jsx';
import PlayerPieces from './PlayerPieces.jsx';
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
			width: 10,
			height: 10,
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
		board[-1] = { 
			'-1': 'R', 
			[width]: 'G' 
		};
		board[height] = { 
			'-1': 'B', 
			[width]: 'Y' 
		};
		this.setState({ board: board });
	} 

	onClickHandler(e) {
		const { board } = this.state;
		const { row, col } = e.target.dataset;
		const coloredPiece = piece('r');
		placePiece(board, coloredPiece, +row, +col);
		this.setState({ board: board });
	}

	onDragOverHandler(e) {
		// TODO: IMPLEMENT MOVE PREVIEW
		e.preventDefault();
		return false;
	}	

	onDropHandler(e) {
		const { board } = this.state;
		const { row, col } = e.target.dataset;
    const offset = event.dataTransfer.getData("text/plain").split(',');
    const id = event.dataTransfer.getData("text/id");
    const color = event.dataTransfer.getData("text/color");
    const elem = document.getElementById(id);
    const shape = JSON.parse(event.dataTransfer.getData("text/shape"));
		const [dRow, dCol] = event.dataTransfer.getData("text/coords").split(',');
		const coloredPiece = piece(color, shape);
		const canPlace = placePiece(board, coloredPiece, +row, +col, +dRow, +dCol);
    if (canPlace) {
    	elem.parentNode.removeChild(elem);
    	this.setState({ board: board });
    } else {
      elem.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
    	elem.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
    }
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
  			<PlayerPieces color='red' left={50} top={50} /> 
  			<PlayerPieces color='green' left={1200} top={600} />  	
  			<PlayerPieces color='blue' left={50} top={600} />  
  			<PlayerPieces color='yellow' left={1200} top={50} />  		
  		</div>
  	)
  }
}