import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/AssignmentOutlined";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import CasinoIcon from "@material-ui/icons/Casino";
import classnames from "classnames";
import React from "react";
import { connect } from "react-redux";

import { State } from "../../store/state";
import { changePlayerName, randomizePlayerName } from "../../store/appActions";

import "./Lobby.scss";
import DrawingCanvas from "../../canvas";

type StateProps = {
  gameToken: string,
  playerName: string,
};

type ActionProps = {
  randomizePlayerName: () => void,
  changePlayerName: (name: string) => void,
};

type Props = StateProps & ActionProps;

type ComponentState = {
  dieRolling: boolean,
  showingCheckbox: boolean,
  checkboxShown: boolean,
};

class Lobby extends React.Component<Props, ComponentState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dieRolling: false,
      showingCheckbox: false,
      checkboxShown: false,
    };

    this.handleCopy = this.handleCopy.bind(this);
    this.handleRandomize = this.handleRandomize.bind(this);
    this.handleRandomizeAnimationEnd = this.handleRandomizeAnimationEnd.bind(this);
  }

  private gameTokenRef = React.createRef<HTMLInputElement>();
  private timeoutHandle: number | null = null;

  render() {
    return (
      <Grid container spacing={2} justify="center" className="Lobby">
        <Grid item xs={12} md={7}>
          {this.renderGameInfo()}
        </Grid>
        <Grid item xs={12} md={7}>
          {this.renderPlayerSection()}
        </Grid>
      </Grid>
    );
  }

  private handleCopy() {
    const tokenInput = this.gameTokenRef.current;
    if (tokenInput) {
      if (this.timeoutHandle) {
        window.clearTimeout(this.timeoutHandle);
        this.timeoutHandle = null;
      }

      tokenInput.value = `http://draw.brotherhoodgames.com/?${this.props.gameToken}`;

      tokenInput.select();
      tokenInput.setSelectionRange(0, tokenInput.value.length);
      tokenInput.focus();

      document.execCommand("copy");

      tokenInput.value = this.props.gameToken;

      this.setState({ showingCheckbox: true, checkboxShown: true });
      this.timeoutHandle = 
          window.setTimeout(
              () => {
                this.setState({ showingCheckbox: false });
                this.timeoutHandle = null;
              },
              1000
          );
    }
  }

  private handleRandomize() {
    this.setState({ dieRolling: true });
    this.props.randomizePlayerName();
  }

  private handleRandomizeAnimationEnd() {
    this.setState({ dieRolling: false });
  }

  private renderGameInfo() {
    return (
      <Paper className="GameInfoSection">
        <Grid container spacing={2}>
          <Grid item xs={12} className="TokenRow">
            <input 
              readOnly 
              className="GameToken MuiInputBase-input" 
              value={this.props.gameToken} 
              ref={this.gameTokenRef}
            />
            <IconButton
              color="secondary"
              title="Copy"
              aria-label="Copy game link to clipboard"
              onClick={this.handleCopy}
            >
              <AssignmentIcon 
                className={classnames("Copy", { 
                  disappear: this.state.showingCheckbox, 
                  appear: !this.state.showingCheckbox && this.state.checkboxShown ,
                })}
              />
              {(this.state.showingCheckbox || this.state.checkboxShown) 
                && (<AssignmentTurnedInIcon className={classnames("Checkbox", {
                  disappear: !this.state.showingCheckbox,
                  appear: this.state.showingCheckbox,
                })} />)}
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" className="Caption">
              This is your unique, hand-delivered game code. Send it to your friends and tell them
              to join, or click the <span className="IconContainer"><AssignmentIcon aria-label="copy" /></span> button 
              to copy the whole address to your clipboard.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  private renderPlayerSection() {
    return (
      <Paper className="PlayerSection">
        <Grid container spacing={2}>
          <Grid item xs={12} className="PlayerRow">
            <TextField 
              label="Player Name"
              variant="outlined"
              size="small"
              value={this.props.playerName}
              onChange={e => this.props.changePlayerName(e.target.value)}
            />
            <IconButton 
              color="secondary"
              title="Randomize"
              aria-label="Suggest a new name"
              onClick={this.handleRandomize} 
              onAnimationEnd={this.handleRandomizeAnimationEnd}
              data-rolling={this.state.dieRolling ? 1 : 0}
            ><CasinoIcon /></IconButton>
          </Grid>
          <Grid item xs={12}>
            <DrawingCanvas label="Draw yourself!" />
          </Grid>
        </Grid>
      </Paper>
    );
  }

}

export default connect(
  function(state: State): StateProps {
    return {
      gameToken: state.game?.data.token || "unknown",
      playerName: state.game?.players[state.game?.localPlayerId].name || "",
    };
  },
  { randomizePlayerName, changePlayerName }
)(Lobby);
