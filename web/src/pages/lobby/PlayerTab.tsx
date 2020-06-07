import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import CasinoIcon from "@material-ui/icons/Casino";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import React from "react";

import DrawingCanvas from "../../canvas";

import "./PlayerTab.scss";

export type Props = {
  playerName: string,
  playerAvatarCompressedImageData?: string,
  changePlayerName: (name: string) => void,
  randomizePlayerName: () => void,
  editPlayerDone: (compressedImageData: string, compressedDataUrl: string) => void,
}

type State = {
  dieRolling: boolean,
};

export default class PlayerTab extends React.Component<Props, State> {
  private canvasRef = React.createRef<DrawingCanvas>();

  constructor(props: Props) {
    super(props);
    this.state = {
      dieRolling: false,
    };

    this.handleRandomize = this.handleRandomize.bind(this);
    this.handleRandomizeAnimationEnd = this.handleRandomizeAnimationEnd.bind(this);
    this.handleDone = this.handleDone.bind(this);
  }

  private handleRandomize() {
    this.setState({ dieRolling: true });
    this.props.randomizePlayerName();
  }

  private handleRandomizeAnimationEnd() {
    this.setState({ dieRolling: false });
  }

  private handleDone() {
    const imageData = this.canvasRef.current?.getImageDataCompressed();
    const dataUrl = this.canvasRef.current?.getImageDataUrlCompressed();
    imageData && dataUrl && this.props.editPlayerDone(imageData, dataUrl);
  }

  render() {
    return (<Paper className="PlayerSection">
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
            className="RandomizeButton"
            color="secondary"
            title="Randomize"
            aria-label="Suggest a new name"
            onClick={this.handleRandomize}
            onAnimationEnd={this.handleRandomizeAnimationEnd}
            data-rolling={this.state.dieRolling ? 1 : 0}
          ><CasinoIcon /></IconButton>
          <Button
            className="DoneButton"
            variant="contained"
            color="primary"
            endIcon={<CheckCircleIcon />}
            onClick={this.handleDone}
          >Done</Button>
        </Grid>
        <Grid item xs={12}>
          <DrawingCanvas
            label="Draw yourself!"
            ref={this.canvasRef}
            imageDataCompressed={this.props.playerAvatarCompressedImageData}
            backgroundImgSrc="avatar-paper.png"
          />
        </Grid>
      </Grid>
    </Paper>);
  }

}
