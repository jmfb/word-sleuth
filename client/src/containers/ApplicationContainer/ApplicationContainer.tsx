import React, { lazy, useEffect } from 'react';
import { Redirect, Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './Header';
import NewerVersionPrompt from './NewerVersionPrompt';
import { useAppSelector, authSlice, diagnosticsSlice } from '~/redux';
import { useInterval } from '~/hooks';

const asyncHomeContainer = lazy(() =>
	import(/* webpackChunkName: 'HomeContainer' */ '~/containers/HomeContainer'));
const asyncProfileContainer = lazy(() =>
	import(/* webpackChunkName: 'ProfileContainer' */ '~/containers/ProfileContainer'));
const asyncSignOutContainer = lazy(() =>
	import(/* webpackChunkName: 'SignOutContainer' */ '~/containers/SignOutContainer'));

export default function ApplicationContainer() {
	const dispatch = useDispatch();
	const history = useHistory();
	const redirectToSignIn = useAppSelector(state => state.auth.redirectToSignIn);
	const url = useAppSelector(state => state.auth.url);
	const email = useAppSelector(state => state.auth.email);
	const bundleVersion = useAppSelector(state => state.diagnostics.bundleVersion);
	const serverBundleVersion = useAppSelector(state => state.diagnostics.serverBundleVersion);

	useEffect(() => {
		dispatch(authSlice.actions.readLocalStorage());
	}, []);

	useInterval(() => {
		dispatch(diagnosticsSlice.actions.heartbeat());
	}, 60_000);

	const handleRefreshClicked = () => {
		history.go(0);
	};

	if (redirectToSignIn && url === undefined) {
		return (
			<Redirect to='/sign-in' />
		);
	}

	if (email === undefined) {
		return null;
	}

	return (
		<>
			<Header {...{email}} />
			<main>
				<section>
					<Switch>
						<Route exact path='/' component={asyncHomeContainer} />
						<Route path='/profile' component={asyncProfileContainer} />
						<Route path='/sign-out' component={asyncSignOutContainer} />
						<Route>
							<Redirect to='/' />
						</Route>
					</Switch>
					<NewerVersionPrompt
						{...{
							bundleVersion,
							serverBundleVersion
						}}
						onClickRefresh={handleRefreshClicked}
						/>
				</section>
			</main>
		</>
	);
}
