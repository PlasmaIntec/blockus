import React, { useState, useEffect } from 'react';
import DraggablePiece from './DraggablePiece.jsx';

const pieceShapes = (C) => [
{
	id: `${C}1x1`,
	type: '_1x1',
	shape: [
		[C]
	]
},
{
	id: `${C}1x2`,
	type: '_1x2',
	shape: [
		[C, C]
	]
},
{
	id: `${C}ShortL`,
	type: '_shortL',
	shape: [
		[C, C],
		[0, C]
	]
},
{
	id: `${C}1x3`,
	type: '_1x3',
	shape: [
		[C, C, C]
	]
},
{
	id: `${C}2x2`,
	type: '_2x2',
	shape: [
		[C, C],
		[C, C]
	]
},
{
	id: `${C}ShortT`,
	type: '_shortT',
	shape: [
		[0, C, 0],
		[C, C, C]
	]
},
{
	id: `${C}1x4`,
	type: '_1x4',
	shape: [
		[C, C, C, C]
	]
},
{
	id: `${C}ShortBoot`,
	type: '_shortBoot',
	shape: [
		[0, 0, C],
		[C, C, C]
	]
},
{
	id: `${C}z`,
	type: '_z',
	shape: [
		[0, C, C],
		[C, C, 0]
	]
},
{
	id: `${C}LongBoot`,
	type: '_longBoot',
	shape: [
		[C, 0, 0, 0],
		[C, C, C, C]
	]
},
{
	id: `${C}LongT`,
	type: '_longT',
	shape: [
		[0, C, 0],
		[0, C, 0],
		[C, C, C]
	]
},
{
	id: `${C}LongL`,
	type: '_longL',
	shape: [
		[C, C, C],
		[0, 0, C],
		[0, 0, C]
	]
},
{
	id: `${C}TwistedBoot`,
	type: '_twistedBoot',
	shape: [
		[0, C, C, C],
		[C, C, 0, 0]
	]
},
{
	id: `${C}Boomerang`,
	type: '_boomerang',
	shape: [
		[0, 0, C],
		[C, C, C],
		[C, 0, 0]
	]
},
{
	id: `${C}1x5`,
	type: '_1x5',
	shape: [
		[C, C, C, C, C]
	]
},
{
	id: `${C}Grenade`,
	type: '_grenade',
	shape: [
		[C, 0],
		[C, C],
		[C, C]
	]
},
{
	id: `${C}Stairs`,
	type: '_stairs',
	shape: [
		[0, C, C],
		[C, C, 0],
		[C, 0, 0]
	]
},
{
	id: `${C}C`,
	type: '_c',
	shape: [
		[C, C],
		[C, 0],
		[C, C]
	]
},
{
	id: `${C}Dancer`,
	type: '_dancer',
	shape: [
		[0, C, C],
		[C, C, 0],
		[0, C, 0]
	]
},
{
	id: `${C}Cross`,
	type: '_cross',
	shape: [
		[0, C, 0],
		[C, C, C],
		[0, C, 0]
	]
},
{
	id: `${C}Halberd`,
	type: '_halberd',
	shape: [
		[0, C, 0, 0],
		[C, C, C, C]
	]
},
];

const PlayerPieces = (props) => {
	const color = props.color[0].toUpperCase();
	const [pieces, usePieces] = useState(pieceShapes(color));

	const updatePiece = (idx, newPiece) => usePieces(
		pieces.slice(0, idx).concat([newPiece]).concat(pieces.slice(idx+1))
	)

	useEffect(() => {
		const color = props.color[0].toUpperCase();
		usePieces(pieceShapes(color));
	}, [props.color]);

	return (
		<div>
			{
				pieces && pieces.map((piece, idx) => (
					<DraggablePiece 
						id={piece.id}
						key={piece.id}
						type={piece.type}
						shape={piece.shape}
						color={props.color[0].toUpperCase()}
						left={+props.left + idx * 40}
						top={+props.top + (idx % 8) * 150}
						idx={idx}
						updatePiece={updatePiece}
					/>
				))
			}
		</div>
	);
}

export default PlayerPieces;