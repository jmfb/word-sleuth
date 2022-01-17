import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAuthenticationUrl, authenticate } from './auth.actions';
import { getNextGame, makeGuess, getAnswer, getStatistics } from './games.actions';
import { IErrorReport } from '~/models';

export interface IErrorState {
	showError: boolean;
	action?: string;
	context?: string;
	message?: string;
}

const initialState: IErrorState = {
	showError: false,
	action: undefined,
	context: undefined,
	message: undefined
};

function setErrorState(state: IErrorState, name: string, message: string, context?: any) {
	state.showError = true;
	state.action = name;
	state.message = message;
	state.context = context ? JSON.stringify(context) : undefined;
}

const slice = createSlice({
	name: 'error',
	initialState,
	reducers: {
		dismissError(state) {
			Object.assign(state, initialState);
		},
		reportError(state, action: PayloadAction<IErrorReport>) {
			const { action: errorAction, context, message } = action.payload;
			state.showError = true;
			state.action = errorAction;
			state.context = context;
			state.message = message;
		}
	},
	extraReducers: builder => builder
		.addCase(getAuthenticationUrl.rejected, (state, action) => {
			setErrorState(state, 'Getting authentication URL', action.error.message);
		})
		.addCase(authenticate.rejected, (state, action) => {
			setErrorState(state, 'Authenticating', action.error.message);
		})
		.addCase(getNextGame.rejected, (state, action) => {
			setErrorState(state, 'Getting next game', action.error.message);
		})
		.addCase(makeGuess.rejected, (state, action) => {
			setErrorState(state, 'Making a guess', action.error.message);
		})
		.addCase(getAnswer.rejected, (state, action) => {
			setErrorState(state, 'Getting answer', action.error.message);
		})
		.addCase(getStatistics.rejected, (state, action) => {
			setErrorState(state, 'Getting statistics', action.error.message);
		})
});

export default {
	...slice,
	actions: {
		...slice.actions
	}
};
