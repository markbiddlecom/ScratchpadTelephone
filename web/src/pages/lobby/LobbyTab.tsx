import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import Paper from "@material-ui/core/Paper";
import React from "react";

import "./LobbyTab.scss";
import { PlayerMap, PeerId, Player } from "../../store/state";
import PlayerCard from "./PlayerCard";

type OnEditClick = () => void;

export type Props = {
  players: PlayerMap,
  localPlayerId: PeerId,
  editPlayer: OnEditClick,
};

type Comparator = (a: Player, b: Player) => -1 | 0 | 1;

function createPlayerMapSorter(localPlayerId: string): Comparator {
  return (a, b) => {
    if (a === b) {
      return 0;
    } else if (a.id === localPlayerId) {
      return -1;
    } else if (b.id === localPlayerId) {
      return 1;
    } else {
      return 0;
    }
  };
}

function EditButton({ onClick }: { onClick: OnEditClick }) {
  return <IconButton className="EditButton" color="secondary" title="Edit" aria-label="Edit" onClick={onClick}>
    <EditIcon />
  </IconButton>;
}

export default function LobbyTab({ players, localPlayerId, editPlayer }: Props) {
  return (<Paper className="LobbyTab">
    {Object.values(players).sort(createPlayerMapSorter(localPlayerId)).map(
      player =>
        <PlayerCard
          key={player.id}
          button={player.id === localPlayerId && <EditButton onClick={editPlayer} />}
          {...player}
        />
    )}
  </Paper>);
}
