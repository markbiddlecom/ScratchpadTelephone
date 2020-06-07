import React from "react";

import PlayerAvatar from "../../components/PlayerAvatar";
import { Player } from "../../store/state";

import "./PlayerCard.scss";
import Typography from "@material-ui/core/Typography";

export type Props = Player & {
  button: JSX.Element | false | undefined,
}

export default function PlayerCard(props: Props) {
  return <div className="PlayerCard">
    <PlayerAvatar {...props} />
    <Typography className="Name" variant="h6">{props.name}</Typography>
    {props.button}
  </div>;
}
