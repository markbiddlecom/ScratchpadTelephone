export const COLUMN_NAME_TOKEN = "token";
export const COLUMN_NAME_TIMESTAMP = "timestamp";

export interface GameDocument {
  token: string,
  timestamp: number,
  syncUri: string,
};
