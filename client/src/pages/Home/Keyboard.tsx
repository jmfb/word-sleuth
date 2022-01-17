import React from 'react';
import { useDocumentKeyboardEvent } from '~/hooks';
import { IGuess, LetterResult } from '~/models';
import cx from 'classnames';
import styles from './Keyboard.css';

export interface IKeyboardProps {
	disabled: boolean;
	guesses: IGuess[];
	entry: string;
	setEntry(word: string): void;
	makeGuess(word: string): void;
}

export default function Keyboard({
	disabled,
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

	const handleKeyPressed = (value: string) => {
		if (disabled) {
			return;
		}
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

	const createClickHandler = (value: string) => () => handleKeyPressed(value);

	const handleDocumentKeyDown = (event: KeyboardEvent) => {
		if (event.code === 'Enter') {
			handleKeyPressed('*');
		} else if (event.code === 'Backspace' || event.code === 'Delete') {
			handleKeyPressed('-');
		} else if (/^[a-z]$/.test(event.key)) {
			handleKeyPressed(event.key);
		} else if (event.code === 'Escape' && !disabled) {
			setEntry('');
		}
	};

	useDocumentKeyboardEvent('keydown', handleDocumentKeyDown);

	const isLetter = (value: string, guess: IGuess, result: LetterResult) => {
		return new Array(5).fill(0).some((notUsed, index) =>
			guess.word[index] === value &&
			guess.letterResults[index] === result);
	};

	const getKeyClassName = (value: string) => {
		const correct = guesses.some(guess => isLetter(value, guess, LetterResult.Correct));
		const wrongPosition = !correct && guesses.some(guess => isLetter(value, guess, LetterResult.WrongPosition));
		const isInWord = correct || wrongPosition;
		const notInWord = !isInWord && guesses.some(guess => isLetter(value, guess, LetterResult.NotInWord));
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
