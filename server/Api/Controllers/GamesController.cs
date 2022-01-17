using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WordSleuth.Server.Api.Models;
using WordSleuth.Server.Models;
using WordSleuth.Server.Services;

namespace WordSleuth.Server.Api.Controllers {
	[Route("api/games")]
	public class GamesController : AuthorizedController {
		private IGamesService GamesService { get; }

		public GamesController(IGamesService gamesService) {
			GamesService = gamesService;
		}

		[HttpGet("next")]
		public async Task<IActionResult> GetNextAsync(
			CancellationToken cancellationToken
		) {
			var games = await GamesService.LoadAllAsync(UserId, cancellationToken);
			if (games.Any()) {
				var lastGame = games.OrderBy(game => game.GameId).Last();
				return Ok(new GameModel(lastGame));
			}
			return Ok(new GameModel(1));
		}

		[HttpPost("{gameId}/guess/{word}")]
		public async Task<IActionResult> PostGuessAsync(
			[FromRoute] int gameId,
			[FromRoute] string word,
			CancellationToken cancellationToken
		) {
			var game = await GamesService.GetAsync(UserId, gameId, cancellationToken);
			if (game.Status != (int)GameStatus.InProgress) {
				return BadRequest();
			}
			var result = await GamesService.MakeGuessAsync(game, word, cancellationToken);
			return Ok(result);
		}

		[HttpGet("{gameId}/answer")]
		public async Task<IActionResult> GetAnswerAsync(
			[FromRoute] int gameId,
			CancellationToken cancellationToken
		) {
			var game = await GamesService.GetAsync(UserId, gameId, cancellationToken);
			if (game.Status != (int)GameStatus.Incorrect) {
				return BadRequest();
			}
			return Ok(game.Word);
		}

		[HttpGet("statistics")]
		public async Task<IActionResult> GetStatisticsAsync(
			CancellationToken cancellationToken
		) {
			var statistics = await GamesService.GetStatisticsAsync(UserId, cancellationToken);
			return Ok(statistics);
		}
	}
}
