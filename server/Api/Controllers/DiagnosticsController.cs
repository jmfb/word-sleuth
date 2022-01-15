using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WordSleuth.Server.Models;
using WordSleuth.Server.Api.Models;

namespace WordSleuth.Server.Api.Controllers {
	[Route("api/diagnostics")]
	public class DiagnosticsController : AuthorizedController {
		private AppSettings AppSettings { get; }

		public DiagnosticsController(IOptions<AppSettings> appSettingsAccessor) {
			AppSettings = appSettingsAccessor.Value;
		}

		[HttpGet("heartbeat")]
		public HeartbeatModel Heartbeat() => new HeartbeatModel {
			BundleVersion = AppSettings.BundleVersion
		};
	}
}
