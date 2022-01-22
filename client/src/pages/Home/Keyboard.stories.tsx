import React from 'react';
import { Story, Meta } from '@storybook/react';
import Keyboard, { IKeyboardProps } from './Keyboard';
import { LetterResult } from '~/models';
import '~/index.css';

export default {
	title: 'Pages/Home/Keyboard',
	component: Keyboard,
} as Meta;

const Template: Story<IKeyboardProps> = props =>
	<Keyboard {...props} />;

export const Standard = Template.bind({});
Standard.args = {
	disabled: false,
	guesses: [
		{
			word: 'audit',
			letterResults: [
				LetterResult.Correct,
				LetterResult.WrongPosition,
				LetterResult.Correct,
				LetterResult.NotInWord,
				LetterResult.NotInWord
			]
		}
	],
	entry: ''
};
