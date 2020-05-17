import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { connect } from "react-redux";

import { newGame, joinGame } from "../../store/appActions";
import { GameId } from "../../store/state";

import "./StartGameForm.scss";

type Props = {
  gridSpacing?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
  newGame: () => void,
  joinGame: (gameId: GameId) => void,
};

function StartGameForm({ gridSpacing, newGame }: Props) {
  return (
    <Grid container spacing={gridSpacing} className="StartGameForm">
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={newGame}>Start a Game</Button>
      </Grid>
      <Grid item xs={12} className="or"><Typography variant="body1">or</Typography></Grid>
      <Grid item xs={7}>
        <TextField label="Game ID" helperText="Ask your game leader!" variant="outlined" size="small" />
      </Grid>
      <Grid item xs={5}><Button variant="contained" color="secondary">Join Game</Button></Grid>
    </Grid>
  );
}

export default connect(null, { newGame, joinGame })(StartGameForm);
