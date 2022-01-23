import React, { useState } from 'react';
import { Button } from '~/components';
import { Story, Meta } from '@storybook/react';
import Letter, { ILetterProps } from './Letter';
import { LetterResult } from '~/models';
import '~/index.css';

export default {
	title: 'Pages/Home/Letter',
	component: Letter,
} as Meta;

const Template: Story<ILetterProps> = props => {
	const [result, setResult] = useState<LetterResult>();
	const [invalidWord, setInvalidWord] = useState(false);
	return (
		<div>
			<div style={{ marginBottom: '1rem' }}>
				<Letter {...props} {...{result, invalidWord}} />
			</div>
			<div>
				<span style={{ marginRight: '1rem' }}>
					<Button
						onClick={() => { setResult(undefined); setInvalidWord(false); }}>
						Reset
					</Button>
				</span>
				<span style={{ marginRight: '1rem' }}>
					<Button
						onClick={() => { setResult(LetterResult.Correct); setInvalidWord(false); }}>
						Correct
					</Button>
				</span>
				<span style={{ marginRight: '1rem' }}>
					<Button
						onClick={() => { setResult(LetterResult.WrongPosition); setInvalidWord(false); }}>
						Wrong Position
					</Button>
				</span>
				<span style={{ marginRight: '1rem' }}>
					<Button
						onClick={() => { setResult(LetterResult.NotInWord); setInvalidWord(false); }}>
						Not in Word
					</Button>
				</span>
				<span style={{ marginRight: '1rem' }}>
					<Button
						onClick={() => { setResult(undefined); setInvalidWord(true); }}>
						Invalid
					</Button>
				</span>
			</div>
		</div>
	);
}

export const Standard = Template.bind({});
Standard.args = {
	value: 'a'
};
