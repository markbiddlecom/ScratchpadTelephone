import { DynamoDB } from "aws-sdk";
import { GameDocument, COLUMN_NAME_TOKEN, COLUMN_NAME_TIMESTAMP } from "../model/model";

const TABLE_NAME = "scratchpadtelep_games";

const DOC_CLIENT = new DynamoDB.DocumentClient();

/**
 * Returns a list of all existing games in the system matching one of the given tokens.
 * @param tokens the set of tokens to find existing games for.
 */
export function batchGetGames(tokens: string[]): Promise<GameDocument[]> {
  return new Promise((resolve, reject) => {
    const request: DynamoDB.DocumentClient.BatchGetItemInput = {
      RequestItems: {
        [TABLE_NAME]: {
          Keys: tokens.map(token => ({ [COLUMN_NAME_TOKEN]: token })),
          ConsistentRead: true,
        },
      },
    };

    DOC_CLIENT.batchGet(request, (err, data) => {
      if (err) {
        reject(err);
      } else if (!data || !data.Responses) {
        reject(new Error("Missing responses map!"));
      } else {
        resolve(<GameDocument[]> data.Responses[TABLE_NAME]);
      }
    });
  });
};

function putGame(
    game: GameDocument, 
    conditionExpression: string, 
    expressionAttributes: any | undefined = undefined
): Promise<GameDocument | null> {
  return new Promise((resolve, reject) => {
    const request: DynamoDB.DocumentClient.PutItemInput = {
      TableName: TABLE_NAME,
      ConditionExpression: conditionExpression,
      ExpressionAttributeValues: expressionAttributes,
      Item: game,
    };

    DOC_CLIENT.put(request, (err, data) => {
      if (err && err.name === "ConditionalCheckFailedException") {
        resolve(null);
      } else if (err) {
        reject(err);
      } else if (!data || !data.Attributes) {
        reject(new Error("Missing responses map!"));
      } else {
        return <GameDocument> data.Attributes;
      }
    });
  });
}

/**
 * Attempts to create a new game. Returns null if somebody else beat us to it, otherwise returns the created game.
 * @param game the game to attempt creating.
 */
export function createGame(game: GameDocument): Promise<GameDocument | null> {
  return putGame(game, `attribute_not_exists(${COLUMN_NAME_TOKEN})`);
}

/**
 * Attempts to update an existing game record. The update fails (and this method returns null) if the existing record in
 * the DB does not have the given timestamp at the time of the update.
 * 
 * @param game the game to update
 * @param expectedTimestamp the timestamp value that the DB's current record must have for the update to succeed.
 */
export function updateGame(game: GameDocument, expectedTimestamp: number): Promise<GameDocument | null> {
  return putGame(game, `${COLUMN_NAME_TIMESTAMP} = :timestamp`, { timestamp: expectedTimestamp });
}
