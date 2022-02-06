namespace WordSleuth.Server.Models {
	public class GuessResult {
		public Guess Guess { get; set; }
		public GuessStatus Status { get; set; }
		public int? RemainingPossibilities { get; set; }
	}
}
