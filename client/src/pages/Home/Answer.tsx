import React, { useEffect } from 'react';
import { GameStatus } from '~/models';
import styles from './Answer.css';

export interface IAnswerProps {
	id: number;
	status: GameStatus;
	answer: string;
	getAnswer(): void;
}

export default function Answer({
	id,
	status,
	answer,
	getAnswer
}: IAnswerProps) {
	useEffect(() => {
		if (!answer && status === GameStatus.Incorrect) {
			getAnswer();
		}
	}, [id, status]);

	if (!answer) {
		return null;
	}

	return (
		<div className={styles.root}>
			Answer: {answer.toUpperCase()}
		</div>
	);
}
