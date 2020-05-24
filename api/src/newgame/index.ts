import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import CONFIG from "../config";
import newGameToken from "./newGameToken";

const TOKEN_CHARS: string = 
    Object.keys(CONFIG.TOKEN_CHARS)
        .reduce((chars: string, char: string) => chars + char, "");

export default async function newGameHandler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: JSON.stringify({
      token: CONFIG.TOKEN_FORMATTER(await newGameToken(CONFIG.TOKEN_LENGTH, TOKEN_CHARS)),
    }),
  };
};
