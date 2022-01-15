import { configureStore } from '@reduxjs/toolkit';
import * as errorSlice from './error.slice';
import * as authSlice from './auth.slice';
import * as diagnosticsSlice from './diagnostics.slice';
import * as gamesSlice from './games.slice';
import IState from './IState';

export function createStore() {
	return configureStore<IState>({
		reducer: {
			[errorSlice.name]: errorSlice.reducer,
			[authSlice.name]: authSlice.reducer,
			[diagnosticsSlice.name]: diagnosticsSlice.reducer,
			[gamesSlice.name]: gamesSlice.reducer
		}
	});
}
