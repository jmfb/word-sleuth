import React from 'react';
import { Story, Meta } from '@storybook/react';
import Home, { IHomeProps } from './Home';
import '~/index.css';

export default {
	title: 'Pages/Home/Page',
	component: Home
} as Meta;

const Template: Story<IHomeProps> = props =>
	<main>
		<section>
			<Home {...props} />
		</section>
	</main>;

export const Standard = Template.bind({});
Standard.args = {};
