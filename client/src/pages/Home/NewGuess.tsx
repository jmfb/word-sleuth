import React from 'react';
import { useInterval } from '~/hooks';
import Guess from './Guess';
import { IGuessResult, GuessStatus } from '~/models';

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
			<Guess
				guess={{
					word: (entry + '     ').substr(0, 5),
					letterResults: null
				}}
				/>
		);
	}

	if (guess.status === GuessStatus.InvalidWord) {
		return (
			<Guess
				guess={{
					word: entry,
					letterResults: null
				}}
				invalidWord
				/>
		);
	}

	// TODO: Slow reveal
	return <Guess guess={guess.guess} />;
}
