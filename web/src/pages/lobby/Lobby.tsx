import Grid from "@material-ui/core/Grid";
import React from "react";
import { connect } from "react-redux";

import { changePlayerName, randomizePlayerName, editPlayer, editPlayerDone } from "../../store/appActions";
import GameControls from "./GameControls";
import LobbyTab from "./LobbyTab";
import PlayerTab from "./PlayerTab";
import { State, AppState, PlayerMap, PeerId } from "../../store/state";

import "./Lobby.scss";

type StateProps = {
  appState: AppState,
  gameToken: string,
  players: PlayerMap,
  localPlayerId: PeerId,
};

type ActionProps = {
  randomizePlayerName: () => void,
  changePlayerName: (name: string) => void,
  editPlayer: () => void,
  editPlayerDone: (compressedImageData: string, compressedDataUrl: string) => void,
};

type Props = StateProps & ActionProps;

function Lobby(props: Props) {
  const localPlayer = props.players[props.localPlayerId];
  return (
    <Grid container justify="center" className="Lobby OuterGrid">
      <Grid className="ControlsContainer" item xs={12} md={7}>
        <GameControls gameToken={props.gameToken} />
      </Grid>
      <Grid className="TabContainer" item xs={12} md={7}>
        {props.appState === AppState.LobbyDrawing &&
          <PlayerTab
            playerName={localPlayer.name}
            playerAvatarCompressedImageData={localPlayer.avatarCompressedImageData}
            {...props}
          />
        }
        {props.appState === AppState.Lobby && (<LobbyTab {...props} />)}
      </Grid>
    </Grid>
  );
}

export default connect(
  function(state: State): StateProps {
    return {
      appState: state.ui.appState,
      gameToken: state.game?.data.token || "unknown",
      players: state.game?.players || {},
      localPlayerId: state.game?.localPlayerId || "",
    };
  },
  { randomizePlayerName, changePlayerName, editPlayer, editPlayerDone }
)(Lobby);
