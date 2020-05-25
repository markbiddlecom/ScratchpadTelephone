import { GameData } from "../store/state";

export async function createGame(): Promise<GameData> {
  const response = 
      await fetch("https://73uoc3r9je.execute-api.us-west-2.amazonaws.com/Prod/games", { method: "POST" });

  if (!response.ok) {
    throw new Error(`Received non-200 response ${response.status}`);
  }

  return (await response.json()) as GameData;
}
