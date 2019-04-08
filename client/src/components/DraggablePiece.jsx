import React from 'react';

var DraggablePiece = () => (
	<div 
		id='draggable'
		className='red square'
		draggable={true}
		onDragStart={drag_start}
	>
		R
	</div>
);

export default DraggablePiece;

var drag_start = (event) => {
    var style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData("text/plain",
    	(
    		parseInt(style.getPropertyValue("left"),10) - 
	    		event.clientX
	    ) + ',' + 
	    (
	    	parseInt(style.getPropertyValue("top"),10) - 
	    		event.clientY)
    	);
    event.dataTransfer.setData("text/id", event.target.id);
} 