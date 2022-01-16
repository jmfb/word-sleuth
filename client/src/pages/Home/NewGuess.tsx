import React from 'react';
import { useInterval } from '~/hooks';
import Guess from './Guess';
import { IGuessResult } from '~/models';

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

	if (!guess) {
		return (
			<div>{entry}</div>
		);
	}

	// TODO: Slow reveal
	return <Guess guess={guess.guess} />;
}
