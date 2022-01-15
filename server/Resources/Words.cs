using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;

namespace WordSleuth.Server.Resources {
	public static class Words {
		public static HashSet<string> AllWords { get; } = new(ReadAllWords());

		public static string GetWordForGame(int gameId) {
			return AllWords.ElementAt(new Random(gameId).Next(AllWords.Count));
		}

		private static IEnumerable<string> ReadAllWords() {
			using var stream = GetStream("words.txt");
			using var reader = new StreamReader(stream);
			while (!reader.EndOfStream) {
				yield return reader.ReadLine();
			}
		}

		internal static Stream GetStream(string fileName) =>
			Assembly.GetExecutingAssembly().GetManifestResourceStream($"WordSleuth.Resources.{fileName}") ??
			throw new InvalidOperationException($"Could not find template resource: {fileName}");
	}
}
