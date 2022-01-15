using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;

namespace WordSleuth.Server.Configuration {
	public static class Endpoints {
		public static void Configure(IEndpointRouteBuilder endpoints) {
			endpoints.MapControllers();
			endpoints.MapControllerRoute(
				name: "default",
				pattern: "{controller=Home}/{action=Index}/{id?}");
			endpoints.MapFallbackToController("Index", "Home");
		}
	}
}
