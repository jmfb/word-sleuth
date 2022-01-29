import React, { useState } from 'react';
import { useInterval } from '~/hooks';
import Guess from './Guess';
import { IGuess, IGuessResult, GameStatus, GuessStatus } from '~/models';
import styles from './Board.css';

export interface IBoardProps {
	guesses: IGuess[];
	entry: string;
	isGuessing: boolean;
	guess: IGuessResult;
	status: GameStatus;
	commitGuess(): void;
	setEntry(word: string): void;
}

export default function Board({
	guesses,
	entry,
	isGuessing,
	guess,
	status,
	commitGuess,
	setEntry
}: IBoardProps) {
	const [counter, setCounter] = useState(0);

	useInterval(() => {
		if (guess) {
			const steps = guess.status === GuessStatus.InvalidWord ? 2 : 4;
			if (counter === steps) {
				commitGuess();
				setCounter(0);
			} else {
				setCounter(counter + 1);
			}
		}
	}, 150);

	const word = (entry + '     ').substr(0, 5);
	const currentGuess = { word, letterResults: null } as IGuess;
	const slowReveal = guess ? counter : undefined;

	const handleCurrentGuessClicked = (remainingWord: string) => {
		if (!isGuessing) {
			setEntry(remainingWord);
		}
	};

	return (
		<div className={styles.root}>
			{guesses.map((oldGuess, index) =>
				<Guess
					key={index}
					guess={oldGuess}
					/>
			)}
			{status === GameStatus.InProgress &&
				<Guess
					key={guesses.length}
					guess={guess?.guess ?? currentGuess}
					invalidWord={guess?.status === GuessStatus.InvalidWord}
					onClick={handleCurrentGuessClicked}
					{...{slowReveal, isGuessing}}
					/>
			}
			{status === GameStatus.InProgress &&
				new Array(6 - guesses.length - 1).fill(0).map((value, index) =>
					<Guess
						key={guesses.length + index + 1}
						/>
				)
			}
		</div>
	);
}
