import { IErrorState } from './error.slice';
import { IAuthState } from './auth.slice';
import { IDiagnosticsState } from './diagnostics.slice';
import { IGamesState } from './games.slice';

export default interface IState {
	error: IErrorState;
	auth: IAuthState;
	diagnostics: IDiagnosticsState;
	games: IGamesState;
}
