import React from 'react';
import Guess from './Guess';
import NewGuess from './NewGuess';
import { IGuess, IGuessResult, GameStatus } from '~/models';
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
				<NewGuess
					{...{
						entry,
						isGuessing,
						guess,
						commitGuess
					}}
					onClick={handleCurrentGuessClicked}
					/>
			}
			{status === GameStatus.InProgress &&
				new Array(6 - guesses.length - 1).fill(0).map((value, index) =>
					<Guess
						key={index}
						/>
				)
			}
		</div>
	);
}
