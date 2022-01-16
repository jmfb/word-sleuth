import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SignIn } from '~/pages';
import { useAppSelector, authSlice } from '~/redux';

export default function SignInContainer() {
	const dispatch = useDispatch();
	const isSigningIn = useAppSelector(state => state.auth.isSigningIn);
	const url = useAppSelector(state => state.auth.url);

	useEffect(() => {
		dispatch(authSlice.actions.signOut());
	}, []);

	const handleSignInClicked = () => {
		dispatch(authSlice.actions.getAuthenticationUrl());
	};

	if (url !== undefined) {
		return (
			<Redirect to={url} />
		);
	}

	return (
		<SignIn
			{...{
				isSigningIn,
				url
			}}
			onClickSignIn={handleSignInClicked}
			/>
	);
}
