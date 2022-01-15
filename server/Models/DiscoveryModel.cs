using System.Text.Json.Serialization;

namespace WordSleuth.Server.Models {
	public class DiscoveryModel {
		[JsonPropertyName("authorization_endpoint")]
		public string AuthorizationEndpoint { get; set; }

		[JsonPropertyName("token_endpoint")]
		public string TokenEndpoint { get; set; }

		[JsonPropertyName("userinfo_endpoint")]
		public string UserInfoEndpoint { get; set; }
	}
}
