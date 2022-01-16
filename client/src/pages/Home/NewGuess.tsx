import React from 'react';
import { useInterval } from '~/hooks';
import Guess from './Guess';
import { IGuess, IGuessResult, GuessStatus } from '~/models';

export interface INewGuessProps {
	entry: string;
	isGuessing: boolean;
	guess: IGuessResult;
	commitGuess(): void;
}

export default function NewGuess({
	entry,
	isGuessing,
	guess,
	commitGuess
}: INewGuessProps) {
	useInterval(() => {
		if (guess) {
			commitGuess();
		}
	}, 1_000);

	const word = (entry + '     ').substr(0, 5);
	const currentGuess = { word, letterResults: null } as IGuess;

	return (
		<Guess
			guess={guess?.guess ?? currentGuess}
			invalidWord={guess?.status === GuessStatus.InvalidWord}
			/>
	);
}
