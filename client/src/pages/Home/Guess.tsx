import React from 'react';
import Letter from './Letter';
import { IGuess } from '~/models';
import styles from './Guess.css';

export interface IGuessProps {
	guess?: IGuess;
	invalidWord?: boolean;
}

export default function Guess({
	guess,
	invalidWord
}: IGuessProps) {
	const word = guess?.word ?? '     ';
	const letterResults = guess?.letterResults ?? [];
	return (
		<div className={styles.root}>
			{new Array(5).fill(0).map((value, index) =>
				<Letter
					key={index}
					value={word[index]}
					result={letterResults[index]}
					{...{invalidWord}}
					/>
			)}
		</div>
	);
}
