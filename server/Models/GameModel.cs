using System.Collections.Generic;
using System.Linq;

namespace WordSleuth.Server.Models {
	public class GameModel {
		public int Id { get; set; }
		public IEnumerable<Guess> Guesses { get; set; }
		public GameStatus Status { get; set; }

		public GameModel(Game game) {
			Id = game.GameId;
			Guesses = new[] { game.Guess1, game.Guess2, game.Guess3, game.Guess4, game.Guess5, game.Guess6 }
				.Where(guess => !string.IsNullOrEmpty(guess))
				.Select(guess => new Guess(game.Word, guess))
				.ToList();
			Status = (GameStatus)game.Status;
		}

		public GameModel(int gameId) {
			Id = gameId;
			Guesses = Enumerable.Empty<Guess>();
			Status = GameStatus.InProgress;
		}
	}
}
