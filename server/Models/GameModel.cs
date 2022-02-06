using System;
using System.Collections.Generic;
using System.Linq;
using WordSleuth.Server.Resources;

namespace WordSleuth.Server.Models {
	public class GameModel {
		public int Id { get; set; }
		public IEnumerable<Guess> Guesses { get; set; }
		public GameStatus Status { get; set; }
		public int? RemainingPossibilities { get; set; }

		public GameModel(Game game) {
			Id = game.GameId;
			Guesses = new[] { game.Guess1, game.Guess2, game.Guess3, game.Guess4, game.Guess5, game.Guess6 }
				.Where(guess => !string.IsNullOrEmpty(guess))
				.Select(guess => new Guess(game.Word, guess))
				.ToList();
			Status = (GameStatus)game.Status;
			if (Status == GameStatus.InProgress) {
				RemainingPossibilities = GetRemainingPossibilities().Count();
			}
		}

		public GameModel(int gameId) {
			Id = gameId;
			Guesses = Enumerable.Empty<Guess>();
			Status = GameStatus.InProgress;
			RemainingPossibilities = Words.AllWords.Count;
		}

		public string GetRandomGuess() {
			var remainingWords = GetRemainingPossibilities().ToList();
			var index = new Random(0).Next(remainingWords.Count);
			return remainingWords[index];
		}

		public IEnumerable<string> GetRemainingPossibilities() =>
			Words.AllWords.Where(IsPossibility);

		public bool IsPossibility(string word) {
			return Guesses.All(guess => guess.IsSameResult(word));
		}
	}
}
