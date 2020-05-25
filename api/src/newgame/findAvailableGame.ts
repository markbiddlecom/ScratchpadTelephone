import { GameDocument } from "../model/model";
import { batchGetGames } from "../db";
import CONFIG from "../config";

export default async function findAvailableGame(tokens: string[]): Promise<[string, GameDocument | null] | null> {
  const games: Map<string, GameDocument> = 
      (await batchGetGames(tokens))
          .reduce(
              (map, game) => {
                map.set(game.token, game);
                return map;
              },
              new Map()
          );

  // If there are any tokens that aren't in the results, use one of them.
  for (let token of tokens) {
    if (!games.has(token)) {
      console.log("Found unallocated game token", token);
      return [token, null];
    }
  }

  // Otherwise, see if there's an expired game we can reuse.
  const oldestUnexpired = (new Date()).valueOf() - CONFIG.GAME_TIMEOUT_MS;
  for (let game of games.values()) {
    if (game.timestamp < oldestUnexpired) {
      console.log("Found expired game", game);
      return [game.token, game];
    }
  }

  // None of these tokens can be used 😭
  return null;
}
