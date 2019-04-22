import React from 'react';

const Board = ({ 
	board, 
	onClickHandler,
	onDragOverHandler,
	onDropHandler 
}) => {
	if (!board) return null;
	let mappedBoard = [];
	for (let rowIndex = 0; rowIndex < board.length - 1; rowIndex++) {
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
								{sq}
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