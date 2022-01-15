using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WordSleuth.Server.Api.Models;
using WordSleuth.Server.Services;

namespace WordSleuth.Server.Api.Controllers {
	[Route("api/authentication")]
	public class AuthenticationController : Controller {
		private IAuthenticationService AuthenticationService { get; }

		public AuthenticationController(IAuthenticationService authenticationService) {
			AuthenticationService = authenticationService;
		}

		[HttpGet("url")]
		public async Task<string> GetAuthenticationUrlAsync(string redirectUrl) {
			return await AuthenticationService.GetGoogleAuthenticationUrlAsync(redirectUrl);
		}

		[HttpGet("sign-in")]
		public async Task<SignedInModel> SignInAsync(string redirectUrl, string authorizationCode) {
			var googleToken = await AuthenticationService.GetGoogleTokenAsync(redirectUrl, authorizationCode);
			var userInfo = await AuthenticationService.GetUserInfoAsync(googleToken.TokenType, googleToken.AccessToken);
			var email = userInfo.Email.ToLower();
			return new SignedInModel {
				AccessToken = AuthenticationService.CreateAccessToken(email),
				Email = email
			};
		}
	}
}
