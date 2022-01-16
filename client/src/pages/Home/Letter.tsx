import React from 'react';
import { LetterResult } from '~/models';
import cx from 'classnames';
import styles from './Letter.css';

export interface ILetterProps {
	value: string;
	result?: LetterResult;
	invalidWord?: boolean;
}

export default function Letter({
	value,
	result,
	invalidWord
}: ILetterProps) {
	const className = cx(styles.root, {
		[styles.correct]: result === LetterResult.Correct,
		[styles.wrongPosition]: result === LetterResult.WrongPosition,
		[styles.notInWord]: result === LetterResult.NotInWord,
		[styles.invalidWord]: invalidWord
	});
	return (
		<span {...{className}}>
			<div className={styles.letter}>{value.toUpperCase()}</div>
		</span>
	);
}
