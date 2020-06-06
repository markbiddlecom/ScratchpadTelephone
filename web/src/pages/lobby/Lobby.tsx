import Grid from "@material-ui/core/Grid";
import React from "react";
import { connect } from "react-redux";

import { changePlayerName, randomizePlayerName, editPlayer, editPlayerDone } from "../../store/appActions";
import GameControls from "./GameControls";
import LobbyTab from "./LobbyTab";
import PlayerTab from "./PlayerTab";
import { State, AppState } from "../../store/state";

import "./Lobby.scss";

type StateProps = {
  appState: AppState,
  gameToken: string,
  playerName: string,
  playerAvatar: string | null | undefined,
};

type ActionProps = {
  randomizePlayerName: () => void,
  changePlayerName: (name: string) => void,
  editPlayer: () => void,
  editPlayerDone: (playerImage: string) => void,
};

type Props = StateProps & ActionProps;

function Lobby(props: Props) {
  return (
    <Grid container spacing={2} justify="center" className="Lobby">
      <Grid item xs={12} md={7}>
        <GameControls gameToken={props.gameToken} />
      </Grid>
      <Grid item xs={12} md={7}>
        {props.appState === AppState.LobbyDrawing && (<PlayerTab {...props} />)}
        {props.appState === AppState.Lobby && (<LobbyTab />)}
      </Grid>
    </Grid>
  );
}

export default connect(
  function(state: State): StateProps {
    return {
      appState: state.ui.appState,
      gameToken: state.game?.data.token || "unknown",
      playerName: state.game?.players[state.game?.localPlayerId].name || "",
      playerAvatar: state.game?.players[state.game?.localPlayerId].avatar,
    };
  },
  { randomizePlayerName, changePlayerName, editPlayer, editPlayerDone }
)(Lobby);
