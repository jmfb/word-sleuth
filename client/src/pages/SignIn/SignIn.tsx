import React from 'react';
import SignInButton from './SignInButton';
import { PageLoading } from '~/components';

export interface ISignInProps {
	isSigningIn: boolean;
	onClickSignIn(): void;
}

export default function SignIn({
	isSigningIn,
	onClickSignIn
}: ISignInProps) {
	return (
		<main>
			<section>
				<h1>Word Sleuth</h1>
				<h2>Word guessing puzzle game</h2>
				<p>Please sign in with any of your Google accounts.</p>
				<SignInButton
					type='dark'
					isDisabled={isSigningIn}
					onClick={onClickSignIn}
					/>
				{isSigningIn &&
					<PageLoading message='Redirecting to Google sign-in page...' />
				}
			</section>
		</main>
	);
}
