import React, { Component } from 'react';

export default class DraggablePiece extends Component {
	constructor(props) {
		super(props);
		this.state = {
			row: null,
			col: null,
		};
		this.onDragStartHandler = this.onDragStartHandler.bind(this);
		this.onMouseDownHandler = this.onMouseDownHandler.bind(this);
	}

	onDragStartHandler(e) {
    var style = window.getComputedStyle(e.target, null);
    e.dataTransfer.setData("text/plain",
    	(
    		parseInt(style.getPropertyValue("left"),10) - 
	    		e.clientX
	    ) + ',' + 
	    (
	    	parseInt(style.getPropertyValue("top"),10) - 
	    		e.clientY)
    	);
    e.dataTransfer.setData("text/id", e.target.id);
    e.dataTransfer.setData("text/shape", 
    	e.target.dataset.shape);
    e.dataTransfer.setData("text/coords", 
    	this.state.row + ',' + this.state.col);
	} 

	onMouseDownHandler(e) {
		const { row, col } = e.target.dataset;
		this.setState({ row: row, col: col });
	}

	render() {
		const { id, shape, type } = this.props;
		return (
			<div 
				id={id}
				className={'piece ' + type}
				data-shape={JSON.stringify(shape)}
				onDragStart={this.onDragStartHandler}
				draggable={true}
			>
				{
					shape && shape.map((row, rowIndex) => (
						<div className='row' key={rowIndex}>
							{
								row && row.map((sq, colIndex) => {
									if (!sq) {
										return (
											<div 
												className='blank square'
												key={colIndex}
												data-row={rowIndex}
												data-col={colIndex}
												onMouseDown={this.onMouseDownHandler}
											>
											</div>
										)
									}
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
											onMouseDown={this.onMouseDownHandler}
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
		)
	}
}