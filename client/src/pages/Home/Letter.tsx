import React from 'react';
import { LetterResult } from '~/models';
import cx from 'classnames';
import styles from './Letter.css';

export interface ILetterProps {
	value: string;
	result?: LetterResult;
	invalidWord?: boolean;
	onClick?(): void;
}

export default function Letter({
	value,
	result,
	invalidWord,
	onClick
}: ILetterProps) {
	const className = cx(styles.root, {
		[styles.correct]: result === LetterResult.Correct,
		[styles.wrongPosition]: result === LetterResult.WrongPosition,
		[styles.notInWord]: result === LetterResult.NotInWord,
		[styles.invalidWord]: invalidWord
	});
	const handleClicked = () => {
		if (onClick) {
			onClick();
		}
	};
	return (
		<span {...{className}} onClick={handleClicked}>
			<div className={styles.letter}>{value.toUpperCase()}</div>
		</span>
	);
}
