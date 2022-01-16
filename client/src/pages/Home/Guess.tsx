import React from 'react';
import { IGuess } from '~/models';

export interface IGuessProps {
	guess?: IGuess;
}

export default function Guess({
	guess
}: IGuessProps) {
	const word = guess?.word ?? '     ';
	return (
		<div>{word}</div>
	);
}
