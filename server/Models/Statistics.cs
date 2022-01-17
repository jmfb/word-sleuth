using System.Collections.Generic;

namespace WordSleuth.Server.Models {
	public class Statistics {
		public int GamesPlayed { get; set; }
		public int GamesWon { get; set; }
		public int CurrentStreak { get; set; }
		public int LongestStreak { get; set; }
		public IDictionary<int, int> WinsByGuessCount { get; set; }
	}
}
