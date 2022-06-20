import React from 'react';

const Board = ({ 
	board, 
	width,
	height,
	onClickHandler,
	onDragOverHandler,
	onDropHandler 
}) => {
	if (!board) return null;	

	const coordinateToStyle = (x, y) => {
		if (x == 0 && y == 0) {
			return "red-inset-outline"
		}
		if (x == 0 && y == width-1) {
			return "green-inset-outline"
		}
		if (x == height-1 && y == 0) {
			return "blue-inset-outline"
		}
		if (x == height-1 && y == width-1) {
			return "yellow-inset-outline"
		}
		return ""
	}

	let mappedBoard = [];
	for (let rowIndex = 0; rowIndex < height; rowIndex++) {
		let row = board[rowIndex];
		mappedBoard.push(
			<div className='row' key={rowIndex}>
				{
					row && row.map((sq, colIndex) => {
						const className = [], sqUpper = sq && sq.toUpperCase();
						switch(sqUpper) {
							case 'R':
								className.push('red');
								break;
							case 'G':
								className.push('green');
								break;
							case 'B':
								className.push('blue');
								break;
							case 'Y':
								className.push('yellow');
								break;
						}
						className.push('square');
						className.push(coordinateToStyle(rowIndex, colIndex))
						return (
							<div 
								className={className.join(' ')}
								key={colIndex}
								data-row={rowIndex}
								data-col={colIndex}
								onClick={onClickHandler}
								onDragOver={onDragOverHandler}
								onDrop={onDropHandler}
							>
							</div>
						)
					})
				}
			</div>
		)
	}
	return (
		<div className='board'>
			{
				board && mappedBoard
			}
		</div>
	);
}

export default Board;