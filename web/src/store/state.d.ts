export type PeerId = string;
export type CardId = string;

export enum PlayerState {
  Joined = "joined",
  DrawingAvatar = "drawing-avatar",
  Ready = "ready",
  PreparingAnswer = "preparing-answer",
  Waiting = "waiting",
};

export enum CardState {
  Authoring = "authoring",
  Committed = "committed",
};

export enum CardType {
  Description = "description",
  Drawing = "drawing",
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
  partners: { [id: PeerId]: Peer },
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
  inspirationId?: CardId,
  content: string | any,
};

export type Game = {
  id: string,
  timestamp: number,
  players: { [id: PlayerId]: Player },
  cards: { [id: CardId]: Card },
};

export type State = {
  game?: Game,
  session?: Session,
};
