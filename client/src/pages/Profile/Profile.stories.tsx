import React from 'react';
import { Story, Meta } from '@storybook/react';
import Profile, { IProfileProps } from './Profile';
import '~/index.css';

export default {
	title: 'Pages/Profile/Page',
	component: Profile
} as Meta;

const Template: Story<IProfileProps> = props =>
	<main>
		<section>
			<Profile {...props} />
		</section>
	</main>;

export const Standard = Template.bind({});
Standard.args = {};
