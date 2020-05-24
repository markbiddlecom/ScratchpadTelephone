import CONFIG from "../config";
import { GameDocument } from "../model/model";
import newGameToken from "./newGameToken";
import findAvailableGame from "./findAvailableGame";
import { createGame, updateGame } from "../db";

const TOKEN_CHARS: string = 
    Object.keys(CONFIG.TOKEN_CHARS)
        .reduce((chars: string, char: string) => chars + char, "");

export default function createOrComandeerGame(syncUri: string): Promise<GameDocument | null> {
  const timestamp = new Date().valueOf();

  // Start by generating a set of game tokens
  const tokenPromises: Promise<string>[] = new Array(CONFIG.GAME_TOKEN_BATCH_SIZE);
  for (let i = 0; i < tokenPromises.length; i++) {
    tokenPromises[i] = newGameToken(CONFIG.TOKEN_LENGTH, TOKEN_CHARS);
  }
  
  return Promise
      // Let the generation happen in parallel
      .all(tokenPromises)
      // Now see if any of these tokens are free or are linked to an existing game.
      .then(findAvailableGame)
      .then(result => {
        if (result == null) {
          return null;
        }
        const [token, game] = result;
        if (game == null) {
          // An unallocated game token. Let's push a record to the database.
          return createGame({ token, timestamp, syncUri });
        } else {
          // An existing game we need to claim. Let's try and steal the game for oursleves.
          return updateGame(
              Object.assign({}, game, { timestamp, syncUri }), 
              game.timestamp
          );
        }
      });
}
