import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import CONFIG from "../config";
import { getGame } from "../db";

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
    return {
      ...commonResponse,
      statusCode: game ? 200 : 404,
      body: game ? JSON.stringify(game) : "",
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
