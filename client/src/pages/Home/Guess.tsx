import React from 'react';
import Letter from './Letter';
import { IGuess } from '~/models';

export interface IGuessProps {
	guess?: IGuess;
}

export default function Guess({
	guess
}: IGuessProps) {
	const word = guess?.word ?? '     ';
	const letterResults = guess?.letterResults ?? [];
	return (
		<div>
			{new Array(5).fill(0).map((value, index) =>
				<Letter
					key={index}
					value={word[index]}
					result={letterResults[index]}
					/>
			)}
		</div>
	);
}
