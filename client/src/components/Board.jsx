import React from 'react';

var Board = ({ 
	board, 
	onClickHandler,
	onDragOverHandler,
	onDropHandler 
}) => (
	<div className='board'>
		{
			board && board.map((row, rowIndex) => (
				<div className='row' key={rowIndex}>
					{
						row && row.map((sq, colIndex) => {
							var className = [], sqUpper = sq && sq.toUpperCase();
							switch(sqUpper) {
								case 'R':
									className.push('red');
								default:
									className.push('square');
									break;
							}
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
			))
		}
	</div>
);

export default Board;