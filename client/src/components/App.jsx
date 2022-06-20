import React, { useState, useEffect } from 'react';

import Board from './Board.jsx';
import PlayerPieces from './PlayerPieces.jsx';

import { io } from "socket.io-client";

// TODO: REFACTOR USING REDUX
import { 
	piece, 
	genBoard, 
	placePiece,
} from '../gameLogic/index';

import { checkPlacePiece } from "../gameLogic/util"

const generateBoard = (width, height) => {
	const board = genBoard(width, height);
	board[-1] = { 
		'-1': 'R', 
		[width]: 'G' 
	};
	board[height] = { 
		'-1': 'B', 
		[width]: 'Y' 
	};
	return board;
} 

export default () => {
	const [width, useWidth] = useState(20);
	const [height, useHeight] = useState(20);
	const [board, useBoard] = useState(generateBoard(width, height));
	const [assignedColor, useAssignedColor] = useState(null);
	const [socket, useSocket] = useState(null);

	useEffect(() => {
		const socket = io();
	
		socket.on('game', (msg) => {
			console.log(msg)
		});
	
		socket.on('move', (board) => {
			useBoard(board);
		})
	
		socket.on('assign-color', (assignedColor) => {
			useAssignedColor(assignedColor);
		})

		useSocket(socket);
	}, []);

	const onClickHandler = (e) => {
		const { row, col } = e.target.dataset;
		const coloredPiece = piece('r');
		placePiece(board, coloredPiece, +row, +col);
		useBoard(board);
	}

	const onDragOverHandler = (e) => {
		// TODO: IMPLEMENT MOVE PREVIEW
		e.preventDefault();
		return false;
	}	

	const onDropHandler = (e) => {
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

		socket.emit("can-move", (canMove) => {
			if (canMove) {
				const coloredPiece = piece(color, shape);
				const canPlace = checkPlacePiece(board, coloredPiece, +row, +col, +dRow, +dCol);
				if (canPlace) {
					const newBoard = placePiece(board, coloredPiece, +row, +col);
					// need to cast board as object to preserve corner colors
					socket.emit("move", { ...newBoard }); 
					useBoard(newBoard);
					elem.parentNode.removeChild(elem);
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


	let assignedPlayerPieces;
	if (assignedColor === "red") {
		assignedPlayerPieces = (<PlayerPieces color='red' left={50} top={50} />)
	} else if (assignedColor === "yellow") {
		assignedPlayerPieces = (<PlayerPieces color='yellow' left={50} top={50} />)
	} else if (assignedColor === "blue") {
		assignedPlayerPieces = (<PlayerPieces color='blue' left={50} top={50} />)
	} else if (assignedColor === "green") {
		assignedPlayerPieces = (<PlayerPieces color='green' left={50} top={50} />)
	}

	return (
		<div>
			<Board
				board={board}
				width={width}
				height={height}
				onClickHandler={onClickHandler}
				onDragOverHandler={onDragOverHandler}
				onDropHandler={onDropHandler}
			/>
		  	{ assignedPlayerPieces }	
		</div>
	)
}