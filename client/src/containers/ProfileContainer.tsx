import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { PageLoading } from '~/components';
import { Profile } from '~/pages';
import { useAppSelector, gamesSlice } from '~/redux';

export default function ProfileContainer() {
	const dispatch = useDispatch();
	const { getStatistics } = bindActionCreators(gamesSlice.actions, dispatch);
	const isLoading = useAppSelector(state => state.games.isLoadingStatistics);
	const statistics = useAppSelector(state => state.games.statistics);

	useEffect(() => {
		getStatistics();
	}, []);

	if (isLoading) {
		return <PageLoading message='Loading statistics' />;
	}

	if (!statistics) {
		return null;
	}

	return (
		<Profile {...{statistics}} />
	);
}
