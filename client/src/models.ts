export interface IErrorReport {
	action: string;
	context: string;
	message: string;
}

export interface IIndexModel {
	bundleVersion: string;
}

export interface ISignedInModel {
	accessToken: string;
	email: string;
}

export interface IHeartbeatModel {
	bundleVersion: string;
}

export enum GameStatus {
	InProgress = 0,
	Correct,
	Incorrect
}

export enum GuessStatus {
	InvalidWord = 0,
	Incorrect,
	Correct
}

export enum LetterResult {
	NotInWord = 0,
	Correct,
	WrongPosition
}

export interface IGuess {
	word: string;
	letterResults: LetterResult[];
}

export interface IGuessResult {
	guess?: IGuess;
	status: GuessStatus;
	remainingPossibilities?: number;
}

export interface IGame {
	id: number;
	guesses: IGuess[];
	status: GameStatus;
	remainingPossibilities?: number;
}

export interface IStatistics {
	gamesPlayed: number;
	gamesWon: number;
	currentStreak: number;
	longestStreak: number;
	winsByGuessCount: Record<number, number>;
}
