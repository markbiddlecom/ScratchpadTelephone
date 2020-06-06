export type PeerId = string;
export type CardId = string;
export type GameId = string;

export enum PlayerState {
  Joined = "joined",
  DrawingAvatar = "drawing-avatar",
  Ready = "ready",
  PreparingAnswer = "preparing-answer",
  Waiting = "waiting",
};

export enum CardState {
  Pending = "pending",
  Authoring = "authoring",
  Committed = "committed",
};

export enum CardType {
  Description = "description",
  Drawing = "drawing",
};

export enum AppState {
  Landing = "landing",
  Connecting = "connecting",
  Lobby = "lobby",
  LobbyDrawing = "lobby_drawing",
  Playing = "playing",
};

export type Peer = {
  id: PeerId,
  lastSequenceNumber?: number,
  timestamp?: number,
};

export type Session = {
  streamUrl: string,
  nextSequenceNumber: number,
  connected: boolean,
  partners: { [peerId: string]: Peer },
};

export type Player = {
  name: string,
  id: PeerId,
  avatar: string | null,
  state: PlayerState,
  pendingInspirationId: CardId | null,
};

export type Card = {
  id: CardId,
  type: CardType,
  state: CardState,
  author: PeerId,
  previousCard?: CardId,
  nextCard?: CardId,
  content: string | any,
};

export type GameData = {
  token: string,
  timestamp: number,
  syncUrl: string,
};

export type PlayerMap = {
  [playerId: string]: Player;
};

export type Game = {
  data: GameData,
  localPlayerId: PeerId,
  players: PlayerMap,
  cards: { [cardId: string]: Card },
};

export type UserInterface = {
  appState: AppState,
};

export type State = {
  ui: UserInterface,
  game?: Game,
  session?: Session,
};
