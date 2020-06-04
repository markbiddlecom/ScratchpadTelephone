import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import UndoIcon from '@material-ui/icons/Undo';
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import React from "react";
import CanvasDraw from "react-canvas-draw";

import "./index.scss";

const COLORS: readonly string[] = Object.freeze(["#000000", "#00ff00", "#ff0000", "#11b1ff", "#ffff00"]);
const BRUSH_SIZES: readonly number[] = Object.freeze([4, 8, 12]);

const MAX_BRUSH_RENDER_SIZE = 0.50;
const MIN_BRUSH_RENDER_SIZE = 0.25;

const MIN_BRUSH_SIZE = BRUSH_SIZES.reduce((r, v) => (v < r ? v : r), BRUSH_SIZES[0]);
const MAX_BRUSH_SIZE = BRUSH_SIZES.reduce((r, v) => (v > r ? v : r), BRUSH_SIZES[0]);

function brushRenderSize(brushSize: number): number {
  return MIN_BRUSH_RENDER_SIZE
      + ((brushSize - MIN_BRUSH_SIZE) / (MAX_BRUSH_SIZE - MIN_BRUSH_SIZE))
      * (MAX_BRUSH_RENDER_SIZE - MIN_BRUSH_RENDER_SIZE);
}

export type Props = {
  label: string,
};

type State = {
  canvasWidth: number | null,
  brushSize: number,
  brushColor: string,
};

function SvgCircle({ radius = 0.5, fill }: { radius?: number, fill?: string }) {
  return (<svg viewBox="0 0 1 1">
    <circle cx={0.5} cy={0.5} r={radius} fill={fill} />
  </svg>);
}

type BrushSizeHandlerMap = {
  [key: number]: () => void,
};

type BrushColorHandlerMap = {
  [key: string]: () => void,
};

export default class DrawingCanvas extends React.Component<Props, State> {

  private containerRef = React.createRef<HTMLDivElement>();
  private canvasRef = React.createRef<CanvasDraw>();

  private handleBrushSizeHandlers: BrushSizeHandlerMap;
  private handleBrushColorHandlers: BrushColorHandlerMap;

  constructor(props: Props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleBrushSizeHandlers =
        BRUSH_SIZES
            .reduce((map: BrushSizeHandlerMap, size: number) => {
              map[size] = this.handleBrushSizeClick.bind(this, size);
              return map;
            }, {});
    this.handleBrushColorHandlers =
        COLORS
            .reduce((map: BrushColorHandlerMap, color: string) => {
              map[color] = this.handleBrushColorClick.bind(this, color);
              return map;
            }, {});

    this.state = {
      canvasWidth: null,
      brushSize: BRUSH_SIZES[0],
      brushColor: COLORS[0],
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    return (
      <div
        className="DrawingCanvas MuiOutlinedInput-root MuiOutlinedInput-notchedOutline"
        ref={this.containerRef}
      >
        { this.renderCanvas() }
        { this.renderLabel() }
        { this.renderControls() }
      </div>
    );
  }

  private handleResize() {
    if (this.containerRef.current) {
      this.setState({
        canvasWidth: this.containerRef.current.clientWidth - 16,
      });
    }
  }

  private handleBrushSizeClick(brushSize: number) {
    this.setState({ brushSize });
  }

  private handleBrushColorClick(brushColor: string) {
    this.setState({ brushColor });
  }

  private handleUndo() {
    this.canvasRef.current?.undo();
  }

  private handleClear() {
    this.canvasRef.current?.clear();
  }

  private renderLabel() {
    return (<div className="Label">{this.props.label}</div>);
  }

  private renderControls() {
    return (<div className="Controls">
      <ToggleButtonGroup value={this.state.brushSize} className="PenSizeButtons">
        {
          BRUSH_SIZES.map(size => (
            <ToggleButton
              key={size}
              value={size}
              onClick={this.handleBrushSizeHandlers[size]}
            >
              <SvgCircle radius={brushRenderSize(size)} />
            </ToggleButton>
          ))
        }
      </ToggleButtonGroup>
      <ToggleButtonGroup value={this.state.brushColor} className="PenColorButtons">
        {
          COLORS.map(color => (
            <ToggleButton
              key={color}
              value={color}
              onClick={this.handleBrushColorHandlers[color]}
            >
              <SvgCircle fill={color} />
            </ToggleButton>
          ))
        }
      </ToggleButtonGroup>
      <ButtonGroup>
        <Button onClick={this.handleUndo}><UndoIcon /></Button>
        <Button onClick={this.handleClear}><DeleteIcon /></Button>
      </ButtonGroup>
    </div>);
  }

  private renderCanvas() {
    if (this.state.canvasWidth === null) {
      return null;
    }

    return (<CanvasDraw
      ref={this.canvasRef}
      className="Canvas"
      hideGrid
      lazyRadius={0}
      enablePanAndZoom
      clampLinesToDocument
      brushRadius={this.state.brushSize}
      brushColor={this.state.brushColor}
      canvasWidth={this.state.canvasWidth}
      canvasHeight={this.state.canvasWidth}
    />);
  }

}
