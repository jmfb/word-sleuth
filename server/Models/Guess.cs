using System.Collections.Generic;
using System.Linq;

namespace WordSleuth.Server.Models {
	public class Guess {
		public string Word { get; set; }
		public IEnumerable<LetterResult> LetterResults { get; set; }

		public Guess(string word, string guess) {
			Word = guess;
			LetterResults = guess
				.Select((letter, index) => GetLetterResult(word, letter, index))
				.ToList();
		}

		private static LetterResult GetLetterResult(string word, char letter, int index) {
			if (word[index] == letter) {
				return LetterResult.Correct;
			}
			return word.Any(otherLetter => otherLetter == letter) ?
				LetterResult.WrongPosition :
				LetterResult.NotInWord;
		}
	}
}
