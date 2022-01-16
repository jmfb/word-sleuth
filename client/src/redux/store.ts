import { configureStore } from '@reduxjs/toolkit';
import errorSlice from './error.slice';
import authSlice from './auth.slice';
import diagnosticsSlice from './diagnostics.slice';
import gamesSlice from './games.slice';
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
