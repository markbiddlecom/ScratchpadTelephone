import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useRef } from "react";
import { connect } from "react-redux";

import { newGame, joinGame } from "../../store/appActions";
import { GameId, AppState, State } from "../../store/state";

import "./StartGameForm.scss";

type OwnProps = {
  gridSpacing?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
};

type StateProps = {
  appState: AppState,
};

type ActionProps = {
  newGame: () => void,
  joinGame: (token: GameId) => void,
};

type Props = OwnProps & StateProps & ActionProps;

function StartGameForm({ gridSpacing, appState, newGame, joinGame }: Props) {
  const gameToken = useRef<HTMLInputElement>(null);
  const onJoinGameClick = () => gameToken.current && joinGame(gameToken.current.value);

  const connecting = appState === AppState.Connecting;
  const icon =
    connecting
      ? (<CircularProgress color="primary" className="loading"/>)
      : undefined;

  return (
    <Grid container spacing={gridSpacing} className="StartGameForm">
      <Grid item xs={12}>
        <Button variant="contained" color="primary" disabled={connecting} onClick={newGame}>
          Start a Game
        </Button>
      </Grid>
      <Grid item xs={12} className="or"><Typography variant="body1">or</Typography></Grid>
      <Grid item xs={7}>
        <TextField
          label="Game ID"
          helperText="Ask your game leader!"
          variant="outlined"
          size="small"
          disabled={connecting}
          inputRef={gameToken} />
      </Grid>
      <Grid item xs={5}>
        <Button variant="contained" color="secondary" disabled={connecting} onClick={onJoinGameClick}>
          Join Game
        </Button>
      </Grid>
      {icon}
    </Grid>
  );
}

export default connect(
  function(state: State, ownProps: OwnProps): OwnProps & StateProps {
    return {
      ...ownProps,
      appState: state.ui.appState,
    };
  },
  { newGame, joinGame }
)(StartGameForm);
