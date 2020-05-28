import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { getGame } from "../db";
import CONFIG from "../config";

export default async function joinGameHandler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const token = CONFIG.TOKEN_NORMALIZER(event.pathParameters?.token || "");
  const commonResponse = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    const game = await getGame(token);
    const hasGame = game && game.timestamp >= (new Date()).valueOf() - CONFIG.GAME_TIMEOUT_MS;

    return {
      ...commonResponse,
      statusCode: hasGame ? 200 : 404,
      body: hasGame ? JSON.stringify(game) : "",
    };
  } catch(e) {
    console.error("Failed to load game.", e);
    return {
      ...commonResponse,
      statusCode: 500,
      body: JSON.stringify({ error: "An unexpected error occurred." }),
    };
  }
}
