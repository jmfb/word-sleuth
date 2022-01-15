using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using WordSleuth.Server.Models;
using WordSleuth.Server.Resources;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;

namespace WordSleuth.Server.Services {
	public interface IGamesService {
		Task<Game> GetAsync(string userId, int gameId, CancellationToken cancellationToken);
		Task<GuessResult> MakeGuessAsync(Game game, string word, CancellationToken cancellationToken);
		Task<IList<Game>> LoadAllAsync(string userId, CancellationToken cancellationToken);
	}

	public class GamesService : IGamesService {
		private DynamoDBContext Context { get; }

		public GamesService(DynamoDBContext context) {
			Context = context;
		}

		public async Task<Game> GetAsync(string userId, int gameId, CancellationToken cancellationToken) {
			var results = await Context.QueryAsync<Game>(userId, QueryOperator.Equal, new object[] { gameId }).GetRemainingAsync(cancellationToken);
			if (results.Any()) {
				return results.First();
			}
			return new()
			{
				UserId = userId,
				GameId = gameId,
				Word = Words.GetWordForGame(gameId),
				Status = (int)GameStatus.InProgress
			};
		}

		public async Task<GuessResult> MakeGuessAsync(Game game, string word, CancellationToken cancellationToken) {
			if (!Words.AllWords.Contains(word)) {
				return new GuessResult { Status = GuessStatus.InvalidWord };
			}
			var guess = new Guess(game.Word, word);
			var status = guess.LetterResults.All(result => result == LetterResult.Correct) ?
				GuessStatus.Correct :
				GuessStatus.Incorrect;
			if (string.IsNullOrEmpty(game.Guess1)) {
				game.Guess1 = word;
			} else if (string.IsNullOrEmpty(game.Guess2)) {
				game.Guess2 = word;
			} else if (string.IsNullOrEmpty(game.Guess3)) {
				game.Guess3 = word;
			} else if (string.IsNullOrEmpty(game.Guess4)) {
				game.Guess4 = word;
			} else if (string.IsNullOrEmpty(game.Guess5)) {
				game.Guess5 = word;
			} else {
				game.Guess6 = word;
			}
			game.Status = status == GuessStatus.Correct ?
				(int)GameStatus.Correct :
				string.IsNullOrEmpty(game.Guess6) ?
					(int)GameStatus.InProgress :
					(int)GameStatus.Incorrect;
			await Context.SaveAsync(game, cancellationToken);
			return new GuessResult {
				Guess = guess,
				Status = status
			};
		}

		public async Task<IList<Game>> LoadAllAsync(string userId, CancellationToken cancellationToken) {
			return await Context.QueryAsync<Game>(userId).GetRemainingAsync(cancellationToken);
		}
	}
}