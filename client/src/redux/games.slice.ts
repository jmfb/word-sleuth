import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGame, IGuessResult, IStatistics, GameStatus, GuessStatus } from '~/models';
import {
	getNextGame,
	makeGuess,
	makeRandomGuess,
	getAnswer,
	getStatistics
} from './games.actions';

export interface IGamesState {
	isLoading: boolean;
	game: IGame;
	entry: string;
	isGuessing: boolean;
	guess: IGuessResult;
	answer: string;
	isLoadingStatistics: boolean;
	statistics: IStatistics;
}

const initialState: IGamesState = {
	isLoading: false,
	game: null,
	entry: '',
	isGuessing: false,
	guess: null,
	answer: null,
	isLoadingStatistics: false,
	statistics: null
};

const slice = createSlice({
	name: 'games',
	initialState,
	reducers: {
		setEntry(state, action: PayloadAction<string>) {
			state.entry = action.payload;
		},
		commitGuess(state) {
			switch (state.guess.status) {
				case GuessStatus.InvalidWord:
					break;
				case GuessStatus.Incorrect:
					state.entry = '';
					state.game.remainingPossibilities = state.guess.remainingPossibilities;
					state.game.guesses.push(state.guess.guess);
					if (state.game.guesses.length === 6) {
						state.game.status = GameStatus.Incorrect;
					}
					break;
				case GuessStatus.Correct:
					state.entry = '';
					state.game.remainingPossibilities = null;
					state.game.guesses.push(state.guess.guess);
					state.game.status = GameStatus.Correct;
					break;
			}
			state.guess = null;
		},
		newGame(state) {
			state.isLoading = false;
			state.game = {
				id: state.game.id + 1,
				guesses: [],
				status: 0,
				remainingPossibilities: 8938
			};
			state.entry = '';
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

		.addCase(makeRandomGuess.pending, state => {
			state.isGuessing = true;
		})
		.addCase(makeRandomGuess.fulfilled, (state, action) => {
			state.isGuessing = false;
			state.guess = action.payload;
		})
		.addCase(makeRandomGuess.rejected, state => {
			state.isGuessing = false;
		})

		.addCase(getAnswer.fulfilled, (state, action) => {
			state.answer = action.payload;
		})

		.addCase(getStatistics.pending, state => {
			state.isLoadingStatistics = true;
			state.statistics = null;
		})
		.addCase(getStatistics.fulfilled, (state, action) => {
			state.isLoadingStatistics = false;
			state.statistics = action.payload;
		})
		.addCase(getStatistics.rejected, state => {
			state.isLoadingStatistics = false;
		})
});

export default {
	...slice,
	actions: {
		...slice.actions,
		getNextGame,
		makeGuess,
		makeRandomGuess,
		getAnswer,
		getStatistics
	}
};
