import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import createOrComandeerGame from "./createOrComandeerGame";
import CONFIG from "../config";

export default async function newGameHandler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  let game;
  let attempt = 0;

  do {
    console.log(`Attempt ${++attempt} to create new game...`);
    game = await createOrComandeerGame("TODO");
  } while (game === null && attempt < CONFIG.MAX_NEW_GAME_TRIES);

  const commonResponse = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  if (game) {
    return {
      ...commonResponse,
      statusCode: 200,
      body: JSON.stringify(Object.assign({}, game, { token: CONFIG.TOKEN_FORMATTER(game.token) })),
    };
  } else {
    return {
      ...commonResponse,
      statusCode: 420,
      body: JSON.stringify({ error: "Could not create a new game. Please try again later." }),
    };
  }
};
