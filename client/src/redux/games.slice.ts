import { createSlice } from '@reduxjs/toolkit';
import { IGame, IGuessResult } from '~/models';
import {
	getNextGame,
	makeGuess,
	getAnswer
} from './games.actions';

export interface IGamesState {
	isLoading: boolean;
	game: IGame;
	isGuessing: boolean;
	guess: IGuessResult;
	answer: string;
}

const initialState: IGamesState = {
	isLoading: false,
	game: null,
	isGuessing: false,
	guess: null,
	answer: null
};

const slice = createSlice({
	name: 'games',
	initialState,
	reducers: {
		clearGuess(state) {
			state.guess = null;
		},
		newGame(state) {
			state.isLoading = false;
			state.game = {
				id: state.game.id + 1,
				guesses: [],
				status: 0
			};
			state.isGuessing = false;
			state.guess = null;
			state.answer = null;
		}
	},
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

		.addCase(makeGuess.pending, state => {
			state.isGuessing = true;
		})
		.addCase(makeGuess.fulfilled, (state, action) => {
			state.isGuessing = false;
			state.guess = action.payload;
		})
		.addCase(makeGuess.rejected, state => {
			state.isGuessing = false;
		})

		.addCase(getAnswer.fulfilled, (state, action) => {
			state.answer = action.payload;
		})
});

export default {
	...slice,
	actions: {
		...slice.actions,
		getNextGame,
		makeGuess,
		getAnswer
	}
};
