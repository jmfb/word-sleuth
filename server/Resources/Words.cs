using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;

namespace WordSleuth.Resources {
	public static class Words {
		public static HashSet<string> AllWords { get; } = new(ReadAllWords());

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
