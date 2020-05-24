import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import createOrComandeerGame from "./createOrComandeerGame";
import CONFIG from "../config";

export default async function newGameHandler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  let game;
  let attempt = 0;

  do {
    game = await createOrComandeerGame("TODO");
  } while (game === null && ++attempt < CONFIG.MAX_NEW_GAME_TRIES);

  if (game) {
    return {
      statusCode: 200,
      body: JSON.stringify(game),
    };
  } else {
    return {
      statusCode: 420,
      body: JSON.stringify({ error: "Could not create a new game. Please try again later." }),
    };
  }
};
