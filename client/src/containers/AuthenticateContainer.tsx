import React, { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PageLoading } from '~/components';
import { useAppSelector, authSlice } from '~/redux';
import queryString from 'query-string';

export default function AuthenticationContainer() {
	const dispatch = useDispatch();
	const location = useLocation();
	const email = useAppSelector(state => state.auth.email);
	const { code } = queryString.parse(location.search) as { code: string; };

	useEffect(() => {
		dispatch(authSlice.actions.authenticate(code));
	}, [code]);

	if (email !== undefined || !code) {
		return (
			<Redirect to='/' />
		);
	}

	return (
		<main>
			<section>
				<PageLoading message='Authenticating...' />
			</section>
		</main>
	);
}
