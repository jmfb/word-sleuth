import React, { useState } from 'react';
import { useInterval } from '~/hooks';
import Guess from './Guess';
import { IGuess, IGuessResult, GuessStatus } from '~/models';

export interface INewGuessProps {
	entry: string;
	isGuessing: boolean;
	guess: IGuessResult;
	commitGuess(): void;
	onClick(remainingWord: string): void;
}

export default function NewGuess({
	entry,
	isGuessing,
	guess,
	commitGuess,
	onClick
}: INewGuessProps) {
	const [counter, setCounter] = useState(0);

	useInterval(() => {
		if (guess) {
			if (counter === 5) {
				commitGuess();
				setCounter(0);
			} else {
				setCounter(counter + 1);
			}
		}
	}, 200);

	const word = (entry + '     ').substr(0, 5);
	const currentGuess = { word, letterResults: null } as IGuess;
	const slowReveal = guess ? counter : undefined;

	return (
		<Guess
			guess={guess?.guess ?? currentGuess}
			invalidWord={guess?.status === GuessStatus.InvalidWord}
			{...{slowReveal, onClick}}
			/>
	);
}
