using System.Text.Json.Serialization;

namespace WordSleuth.Server.Models {
	public class TokenModel {
		[JsonPropertyName("access_token")]
		public string AccessToken { get; set; }

		[JsonPropertyName("token_type")]
		public string TokenType { get; set; }

		[JsonPropertyName("expires_in")]
		public int ExpiresIn { get; set; }

		[JsonPropertyName("refresh_token")]
		public string RefreshToken { get; set; }

		[JsonPropertyName("id_token")]
		public string IdToken { get; set; }
	}
}
