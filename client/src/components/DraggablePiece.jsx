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
		this.onDoubleClickHandler = this.onDoubleClickHandler.bind(this);
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
    e.dataTransfer.setData("text/color", 
    	e.target.dataset.color);
    e.dataTransfer.setData("text/shape", 
    	e.target.dataset.shape);
    e.dataTransfer.setData("text/coords", 
    	this.state.row + ',' + this.state.col);
	} 

	onMouseDownHandler(e) {
		const { row, col } = e.target.dataset;
		this.setState({ row: row, col: col });
	}

	onDoubleClickHandler(e) {
		const { id, shape, type, idx, updatePiece } = this.props;
		const zip = (...arr) => Array(Math.max(...arr.map(a => a.length))).fill().map((_,i) => arr.map(a => a[i]));  
		const flip = (shape) => {
			shape.reverse();
			return shape;
		}
		const rotate = (shape) => {
			shape.reverse();
			return zip(...shape);
		}
		if (e.ctrlKey) {
			updatePiece(idx, {
				id,
				type,
				shape: flip(shape)
			})
		} else {
			updatePiece(idx, {
				id,
				type,
				shape: rotate(shape)
			})
		}		
	}

	render() {
		const { id, shape, type, color, left, top } = this.props;
		return (
			<div 
				id={id}
				style={{ left: `${left}px`, top: `${top}px`}}
				className={'piece ' + type}
				data-shape={JSON.stringify(shape)}
				data-color={color}
				onDragStart={this.onDragStartHandler}
				onDoubleClick={this.onDoubleClickHandler}
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