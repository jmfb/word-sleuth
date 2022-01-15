using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace WordSleuth.Server.Models {
	public class IndexModel {
		public string BundleVersion { get; set; }

		[JsonIgnore]
		public IEnumerable<string> ScriptChunks { get; set; }

		[JsonIgnore]
		public IEnumerable<string> StyleChunks { get; set; }

		public string ToJson() => JsonSerializer.Serialize(
			this,
			new JsonSerializerOptions {
				PropertyNamingPolicy = JsonNamingPolicy.CamelCase
			});
	}
}
