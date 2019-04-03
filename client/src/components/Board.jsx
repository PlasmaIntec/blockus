import React from 'react';

var Board = ({ board, onClickHandler }) => (
	<div className='board'>
		{
			board && board.map((row, rowIndex) => (
				<div className='row' key={rowIndex}>
					{
						row && row.map((sq, colIndex) => {
							var className = [];
							switch(sq) {
								case 'r':
									className.push('red');
								default:
									className.push('square');
									break;
							}
							return (
								<div 
									className={className.join(' ')}
									key={colIndex}
									onClick={onClickHandler}
									data-row={rowIndex}
									data-col={colIndex}
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