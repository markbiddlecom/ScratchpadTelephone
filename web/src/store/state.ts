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
  avatar: any,
  state: PlayerState,
  pendingInspirationId: CardId,
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

export type Game = {
  id: GameId,
  timestamp: number,
  players: { [playerId: string]: Player },
  cards: { [cardId: string]: Card },
};

export type State = {
  appState: AppState,
  game?: Game,
  session?: Session,
};
