import { createAsyncThunk } from '@reduxjs/toolkit';
import IState from './IState';
import * as hub from './games.hub';

export const getNextGame = createAsyncThunk('games/getNextGame', async (unused, { getState }) => {
	const { auth: { accessToken } } = getState() as IState;
	return await hub.getNextGame(accessToken);
});

export const makeGuess = createAsyncThunk('games/makeGuess', async (word: string, { getState }) => {
	const { auth: { accessToken }, games: { game: { id: gameId } } } = getState() as IState;
	return await hub.makeGuess(accessToken, gameId, word);
});

export const getAnswer = createAsyncThunk('games/getAnswer', async (unused, { getState }) => {
	const { auth: { accessToken }, games: { game: { id: gameId } } } = getState() as IState;
	return await hub.getAnswer(accessToken, gameId);
});
