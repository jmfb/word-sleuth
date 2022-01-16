import React from 'react';
import { IGuess, LetterResult } from '~/models';
import cx from 'classnames';
import styles from './Keyboard.css';

export interface IKeyboardProps {
	guesses: IGuess[];
	entry: string;
	setEntry(word: string): void;
	makeGuess(word: string): void;
}

export default function Keyboard({
	guesses,
	entry,
	setEntry,
	makeGuess
}: IKeyboardProps) {
	const rows = [
		'qwertyuiop',
		'asdfghjkl',
		'*zxcvbnm-'
	];

	const createClickHandler = (value: string) => () => {
		if (value === '*') {
			if (entry.length === 5) {
				makeGuess(entry);
			}
		} else if (value === '-') {
			if (entry.length > 0) {
				setEntry(entry.substr(0, entry.length - 1));
			}
		} else if (entry.length < 5) {
			setEntry(entry + value);
		}
	};

	const isLetter = (value: string, guess: IGuess, result: LetterResult) => {
		return new Array(5).fill(0).some((notUsed, index) =>
			guess.word[index] === value &&
			guess.letterResults[index] === result);
	};

	const getKeyClassName = (value: string) => {
		const correct = guesses.some(guess => isLetter(value, guess, LetterResult.Correct));
		const wrongPosition = !correct && guesses.some(guess => isLetter(value, guess, LetterResult.WrongPosition));
		const notInWord = guesses.some(guess => isLetter(value, guess, LetterResult.NotInWord));
		return cx(styles.key, {
			[styles.correct]: correct,
			[styles.wrongPosition]: wrongPosition,
			[styles.notInWord]: notInWord
		});
	};

	return (
		<div className={styles.root}>
			{rows.map((row, rowIndex) =>
				<div key={rowIndex} className={styles.row}>
					{new Array(row.length).fill(0).map((value, index) =>
						<span
							key={index}
							className={getKeyClassName(row[index])}
							onClick={createClickHandler(row[index])}>
							{row[index] === '*' &&
								'ENTER'
							}
							{row[index] === '-' &&
								'BACK'
							}
							{row[index] !== '*' && row[index] !== '-' &&
								row[index].toUpperCase()
							}
						</span>
					)}
				</div>
			)}
		</div>
	);
}
