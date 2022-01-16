import React from 'react';
import { IGuess } from '~/models';

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
	return (
		<div>TODO: Keyboard</div>
	);
}
