import React from 'react';
import Guess from './Guess';
import NewGuess from './NewGuess';
import { IGuess, IGuessResult, GameStatus } from '~/models';

export interface IBoardProps {
	guesses: IGuess[];
	entry: string;
	isGuessing: boolean;
	guess: IGuessResult;
	status: GameStatus;
	commitGuess(): void;
}

export default function Board({
	guesses,
	entry,
	isGuessing,
	guess,
	status,
	commitGuess
}: IBoardProps) {
	return (
		<>
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
					/>
			}
			{status === GameStatus.InProgress &&
				new Array(6 - guesses.length - 1).fill(0).map((value, index) =>
					<Guess
						key={index}
						/>
				)
			}
		</>
	);
}
