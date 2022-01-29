import React from 'react';
import Letter from './Letter';
import { IGuess } from '~/models';
import styles from './Guess.css';

export interface IGuessProps {
	guess?: IGuess;
	invalidWord?: boolean;
	isGuessing?: boolean;
	slowReveal?: number;
	onClick?(remainingWord: string): void;
}

export default function Guess({
	guess,
	invalidWord,
	isGuessing,
	slowReveal,
	onClick
}: IGuessProps) {
	const word = guess?.word ?? '     ';
	const letterResults = guess?.letterResults ?? [];
	const isRevealed = (index: number) => {
		return slowReveal === undefined || index <= slowReveal;
	};
	const createClickHandler = (index: number) => () => {
		if (onClick) {
			onClick(word.substr(0, index).trim());
		}
	};
	return (
		<div className={styles.root}>
			{new Array(5).fill(0).map((value, index) =>
				<Letter
					key={index}
					value={word[index]}
					result={isRevealed(index) ? letterResults[index] : undefined}
					{...{invalidWord, isGuessing}}
					onClick={createClickHandler(index)}
					/>
			)}
		</div>
	);
}
