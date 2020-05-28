import { GameData } from "../store/state";

export async function joinGame(token: string): Promise<GameData> {
  const response =
      await fetch(`https://73uoc3r9je.execute-api.us-west-2.amazonaws.com/Prod/games/${token}`);

  if (!response.ok) {
    throw new Error(`Received non-200 response ${response.status}`);
  }

  return (await response.json()) as GameData;
}
