import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AssignmentIcon from "@material-ui/icons/AssignmentOutlined";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import classnames from "classnames";
import React from "react";

import "./GameControls.scss";

export type Props = {
  gameToken: string,
};

type State = {
  showingCheckbox: boolean,
  checkboxShown: boolean,
};

export default class GameControls extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showingCheckbox: false,
      checkboxShown: false,
    };

    this.handleCopy = this.handleCopy.bind(this);
  }

  private timeoutHandle: number | null = null;
  private gameTokenRef = React.createRef<HTMLInputElement>();

  render() {
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
}