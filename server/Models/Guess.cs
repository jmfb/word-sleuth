using System.Collections.Generic;
using System.Linq;

namespace WordSleuth.Server.Models {
	public class Guess {
		public string Word { get; set; }
		public IEnumerable<LetterResult> LetterResults { get; set; }

		public Guess(string word, string guess) {
			Word = guess;

			var correctLetters = guess
				.Select((letter, index) => (letter, index))
				.Where(pair => word[pair.index] == pair.letter)
				.Select(pair => pair.index)
				.ToList();
			var remainingLetters = word
				.Select((letter, index) => (letter, index))
				.Where(pair => !correctLetters.Contains(pair.index))
				.Select(pair => pair.letter)
				.ToList();

			var letterResults = new LetterResult[5];
			foreach (var index in Enumerable.Range(0, 5)) {
				if (correctLetters.Contains(index)) {
					letterResults[index] = LetterResult.Correct;
				} else if (remainingLetters.Contains(guess[index])) {
					letterResults[index] = LetterResult.WrongPosition;
					remainingLetters.RemoveAt(remainingLetters.IndexOf(guess[index]));
				} else {
					letterResults[index] = LetterResult.NotInWord;
				}
			}
			LetterResults = letterResults;
		}
	}
}
