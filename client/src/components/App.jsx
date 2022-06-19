import React, { Component } from 'react';

import Board from './Board.jsx';
import PlayerPieces from './PlayerPieces.jsx';

import { io } from "socket.io-client";

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
			width: 20,
			height: 20,
			board: null
		}
		this.generateBoard = this.generateBoard.bind(this);
		this.onClickHandler = this.onClickHandler.bind(this);
		this.onDragOverHandler = this.onDragOverHandler.bind(this);
		this.onDropHandler = this.onDropHandler.bind(this);
	}

	componentDidMount() {		
		this.generateBoard();	

		this.socket = io();

		this.socket.on('game', (msg) => {
			console.log(msg)
		});

		this.socket.on('move', (board) => {
			this.setState({ board });
		})

		this.socket.on('assign-color', (assignedColor) => {
			this.setState({ assignedColor });
		})
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

		const offset = e.dataTransfer.getData("text/plain").split(',');
		const id = e.dataTransfer.getData("text/id");
		const color = e.dataTransfer.getData("text/color");
		const elem = document.getElementById(id);
		const shape = JSON.parse(e.dataTransfer.getData("text/shape"));
		const [dRow, dCol] = e.dataTransfer.getData("text/coords").split(',');

		const elementLeft = (e.clientX + parseInt(offset[0],10)) + 'px';
		const elementTop = (e.clientY + parseInt(offset[1],10)) + 'px';
		// since we cannot access event data in socket callback,
		// we need to store event data beforehand

		this.socket.emit("can-move", (canMove) => {
			if (canMove) {
				const coloredPiece = piece(color, shape);
				const canPlace = placePiece(board, coloredPiece, +row, +col, +dRow, +dCol);
				if (canPlace) {
					// need to cast board as object to preserve corner colors
					this.socket.emit("move", { ...board }); 
					elem.parentNode.removeChild(elem);
					this.setState({ board });
				} else {
					elem.style.left = elementLeft;
					elem.style.top = elementTop;
				}
			} else {
				console.log("not your turn")
			}
		})

		e.preventDefault();
		return false;
	}

  render() {
  	const { width, height, board, assignedColor } = this.state;

	let assignedPlayerPieces;
	if (assignedColor === "red") {
		assignedPlayerPieces = (<PlayerPieces color='red' left={50} top={50} />)
	} else if (assignedColor === "yellow") {
		assignedPlayerPieces = (<PlayerPieces color='yellow' left={1200} top={600} />)
	} else if (assignedColor === "blue") {
		assignedPlayerPieces = (<PlayerPieces color='blue' left={50} top={600} />)
	} else if (assignedColor === "green") {
		assignedPlayerPieces = (<PlayerPieces color='green' left={1200} top={50} />)
	}

  	return (
  		<div>
  			<Board
  				board={board}
				width={width}
				height={height}
  				onClickHandler={this.onClickHandler}
  				onDragOverHandler={this.onDragOverHandler}
  				onDropHandler={this.onDropHandler}
  			/>
			{ assignedPlayerPieces }	
  		</div>
  	)
  }
}