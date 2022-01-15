import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SignIn } from '~/pages';
import { IState, authSlice } from '~/redux';

export default function SignInContainer() {
	const dispatch = useDispatch();
	const isSigningIn = useSelector((state: IState) => state.auth.isSigningIn);
	const url = useSelector((state: IState) => state.auth.url);

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
