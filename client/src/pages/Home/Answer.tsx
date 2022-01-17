import React, { useEffect } from 'react';
import { IGuess, GameStatus } from '~/models';
import styles from './Answer.css';

export interface IAnswerProps {
	id: number;
	status: GameStatus;
	guesses: IGuess[];
	answer: string;
	getAnswer(): void;
}

export default function Answer({
	id,
	status,
	guesses,
	answer,
	getAnswer
}: IAnswerProps) {
	useEffect(() => {
		if (!answer && status === GameStatus.Incorrect) {
			getAnswer();
		}
	}, [id, status]);

	const correctAnswer = status === GameStatus.Correct ?
		guesses[guesses.length - 1].word :
		undefined;

	const word = correctAnswer ?? answer;

	if (!word) {
		return null;
	}

	return (
		<div className={styles.root}>
			Answer:
			<a
				className={styles.definition}
				href={`https://www.google.com/search?q=define+${word}`}
				target='_blank'>
				{word.toUpperCase()}
			</a>
		</div>
	);
}
