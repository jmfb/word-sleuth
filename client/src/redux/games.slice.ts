import { createSlice } from '@reduxjs/toolkit';
import { IGame } from '~/models';
import {
	getNextGame,
	makeGuess,
	getAnswer
} from './games.actions';

export interface IGamesState {
	isLoading: boolean;
	game: IGame;
}

const initialState: IGamesState = {
	isLoading: false,
	game: null
};

export const { name, reducer } = createSlice({
	name: 'games',
	initialState,
	reducers: {},
	extraReducers: builder => builder
		.addCase(getNextGame.pending, state => {
			state.isLoading = true;
			state.game = null;
		})
		.addCase(getNextGame.fulfilled, (state, action) => {
			state.isLoading = false;
			state.game = action.payload;
		})
		.addCase(getNextGame.rejected, state => {
			state.isLoading = false;
		})
});

export const actions = {
	getNextGame,
	makeGuess,
	getAnswer
};
