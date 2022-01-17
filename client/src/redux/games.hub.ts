import { get, post } from './hub';
import { IGame, IGuessResult, IStatistics } from '~/models';

export async function getNextGame(accessToken: string) {
	return await get<IGame>({
		endpoint: '/api/games/next',
		accessToken
	});
}

export async function makeGuess(accessToken: string, gameId: number, word: string) {
	return await post<IGuessResult>({
		endpoint: `/api/games/${gameId}/guess/${word}`,
		accessToken
	});
}

export async function getAnswer(accessToken: string, gameId: number) {
	return await get<string>({
		endpoint: `/api/games/${gameId}/answer`,
		accessToken
	});
}

export async function getStatistics(accessToken: string) {
	return await get<IStatistics>({
		endpoint: '/api/games/statistics',
		accessToken
	});
}
