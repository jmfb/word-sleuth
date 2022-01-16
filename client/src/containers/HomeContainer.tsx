import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { Home } from '~/pages';
import { useAppSelector, gamesSlice } from '~/redux';

export default function HomeContainer() {
	const dispatch = useDispatch();
	const {
		getNextGame,
		newGame,
		setEntry,
		makeGuess,
		commitGuess,
		getAnswer
	} = bindActionCreators(gamesSlice.actions, dispatch);
	const isLoading = useAppSelector(state => state.games.isLoading);
	const game = useAppSelector(state => state.games.game);
	const entry = useAppSelector(state => state.games.entry);
	const isGuessing = useAppSelector(state => state.games.isGuessing);
	const guess = useAppSelector(state => state.games.guess);
	const answer = useAppSelector(state => state.games.answer);

	useEffect(() => {
		getNextGame();
	}, []);

	return (
		<Home
			{...{
				isLoading,
				game,
				entry,
				isGuessing,
				guess,
				answer,
				newGame,
				setEntry,
				makeGuess,
				commitGuess,
				getAnswer
			}}
			/>
	);
}
