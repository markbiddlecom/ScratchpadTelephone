import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CasinoIcon from '@material-ui/icons/Casino';

import { State } from "../../store/state";
import { randomizeName } from "../../store/appActions";

import "./Lobby.scss";

type StateProps = {
  gameToken: string,
  playerName: string,
};

type ActionProps = {
  randomizeName: () => void,
};

type Props = StateProps & ActionProps;

function Lobby(props: Props) {
  return (
    <Grid container spacing={2} className="Lobby">
      <Grid item xs={12} md={7}>
        <Paper className="PlayerNameSection">
          <Grid container spacing={2}>
            <Grid item xs={11}>
              <TextField 
                label="Player Name"
                variant="outlined"
                size="small"
                value={props.playerName}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton 
                color="secondary"
                aria-label="Suggest a new name"
                onClick={props.randomizeName} 
              ><CasinoIcon /></IconButton>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default connect(
  function(state: State): StateProps {
    return {
      gameToken: state.game?.data.token || "unknown",
      playerName: state.game?.players[state.game?.localPlayerId].name || "unkown",
    };
  },
  { randomizeName }
)(Lobby);
