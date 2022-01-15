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
		Task SaveAsync(Game game, CancellationToken cancellationToken);
		Task<Game> GetAsync(string userId, int gameId, CancellationToken cancellationToken);
		Task<IList<Game>> LoadAllAsync(string userId, CancellationToken cancellationToken);
	}

	public class GamesService : IGamesService {
		private DynamoDBContext Context { get; }

		public GamesService(DynamoDBContext context) {
			Context = context;
		}

		public async Task SaveAsync(Game game, CancellationToken cancellationToken) {
			await Context.SaveAsync(game, cancellationToken);
		}

		public async Task<Game> GetAsync(string userId, int gameId, CancellationToken cancellationToken) {
			var filter = new QueryFilter("UserId", QueryOperator.Equal, userId);
			filter.AddCondition("GameId", QueryOperator.Equal, gameId);
			var results = await Context.QueryAsync<Game>(filter).GetRemainingAsync(cancellationToken);
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

		public async Task<IList<Game>> LoadAllAsync(string userId, CancellationToken cancellationToken) {
			return await Context.QueryAsync<Game>(userId).GetRemainingAsync(cancellationToken);
		}
	}
}
