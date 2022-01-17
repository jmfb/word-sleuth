import React from 'react';
import { Button, PageLoading } from '~/components';
import Board from './Board';
import Answer from './Answer';
import Keyboard from './Keyboard';
import { IGame, IGuess, IGuessResult, GameStatus, LetterResult } from '~/models';
import styles from './Home.css';

export interface IHomeProps {
	isLoading: boolean;
	game: IGame;
	entry: string;
	isGuessing: boolean;
	guess: IGuessResult;
	answer: string;
	newGame(): void;
	setEntry(word: string): void;
	makeGuess(word: string): void;
	commitGuess(): void;
	getAnswer(): void;
}

export default function Home({
	isLoading,
	game,
	entry,
	isGuessing,
	guess,
	answer,
	newGame,
	setEntry,
	makeGuess,
	commitGuess,
	getAnswer
}: IHomeProps) {
	if (isLoading || !game) {
		return <PageLoading message='Loading next game...' />;
	}

	const { id, guesses, status } = game;

	const letterResultMap = {
		[LetterResult.Correct]: '🟩',
		[LetterResult.WrongPosition]: '🟨',
		[LetterResult.NotInWord]: '⬜'
	};
	const toShareString = (guess: IGuess) => {
		return guess.letterResults.map(result => letterResultMap[result]).join('');
	};

	const handleShare = () => {
		navigator.share({
			text: `Word Sleuth ${id}\n\n` + guesses.map(toShareString).join('\n')
		});
	};

	return (
		<>
			<h1>Game #{id}</h1>
			<Board
				{...{
					guesses,
					entry,
					isGuessing,
					guess,
					status,
					commitGuess
				}}
				/>
			<Answer
				{...{
					id,
					status,
					answer,
					getAnswer
				}}
				/>
			{status === GameStatus.InProgress &&
				<Keyboard
					{...{
						guesses,
						entry,
						setEntry,
						makeGuess
					}}
					disabled={isGuessing || !!guess}
					/>
			}
			{status !== GameStatus.InProgress &&
				<div className={styles.buttons}>
					<Button onClick={handleShare}>SHARE</Button>
					<Button onClick={newGame}>NEW GAME</Button>
				</div>
			}
		</>
	);
}
