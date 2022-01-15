using System.Text.Json.Serialization;

namespace WordSleuth.Server.Models {
	public class UserInfoModel {
		[JsonPropertyName("email")]
		public string Email { get; set; }
	}
}
