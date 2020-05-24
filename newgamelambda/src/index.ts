import "@babel/polyfill";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import newGameToken from "./newGameToken";
import CONFIG from "./config";

const TOKEN_CHARS: string = 
    Object.keys(CONFIG.TOKEN_CHARS)
        .reduce((chars: string, char: string) => chars + char, "");

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: JSON.stringify({
      token: CONFIG.TOKEN_FORMATTER(await newGameToken(CONFIG.TOKEN_LENGTH, TOKEN_CHARS)),
    }),
  };
};
