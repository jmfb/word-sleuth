using System.Text.Json.Serialization;
using Amazon.DynamoDBv2.DataModel;

namespace WordSleuth.Server.Models {
	[DynamoDBTable("word-sleuth-games")]
	public class Game {
		[JsonIgnore]
		[DynamoDBHashKey]
		public string UserId { get; set; }

		[DynamoDBRangeKey]
		public int GameId { get; set; }

		[DynamoDBProperty]
		public string Word { get; set; }

		[DynamoDBProperty]
		public string Guess1 { get; set; }

		[DynamoDBProperty]
		public string Guess2 { get; set; }

		[DynamoDBProperty]
		public string Guess3 { get; set; }

		[DynamoDBProperty]
		public string Guess4 { get; set; }

		[DynamoDBProperty]
		public string Guess5 { get; set; }

		[DynamoDBProperty]
		public string Guess6 { get; set; }

		[DynamoDBProperty]
		public int Status { get; set; }
	}
}
