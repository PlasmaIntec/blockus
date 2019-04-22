import React from 'react';
import DraggablePiece from './DraggablePiece.jsx';

const pieceShapes = (C) => [
{
	id: `${C}rLongL`,
	type: '_longL',
	shape: [
		[C, C, C],
		[0, 0, C],
		[0, 0, C]
	]
},
{
	id: `${C}r2x2`,
	type: '_2x2',
	shape: [
		[C, C],
		[C, C]
	]
},
{
	id: `${C}r1x1`,
	type: '_1x1',
	shape: [
		[C]
	]
},
{
	id: `${C}rShortT`,
	type: '_shortT',
	shape: [
		[0, C, 0],
		[C, C, C]
	]
},
];

const PlayerPieces = (props) => {
	let pieces = pieceShapes(props.color[0].toUpperCase());
	return (
		<div>
			{
				pieces && pieces.map(piece => (
					<DraggablePiece 
						id={piece.id}
						key={piece.id}
						type={piece.type}
						shape={piece.shape}
						color={props.color[0].toUpperCase()}
					/>
				))
			}
		</div>
	);
}

export default PlayerPieces;