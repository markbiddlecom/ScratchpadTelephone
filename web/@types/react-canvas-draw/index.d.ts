declare module "react-canvas-draw" {
  import * as React from 'react';

  export interface CanvasDrawProps {
      onChange?: ((canvas: CanvasDraw) => void) | null;
      loadTimeOffset?: number;
      lazyRadius?: number;
      brushRadius?: number;
      brushColor?: string;
      catenaryColor?: string;
      gridColor?: string;
      backgroundColor?: string;
      hideGrid?: boolean;
      canvasWidth?: number | string;
      canvasHeight?: number | string;
      disabled?: boolean;
      imgSrc?: string;
      saveData?: string;
      immediateLoading?: boolean;
      hideInterface?: boolean;
      enablePanAndZoom?: boolean;
      mouseZoomFactor?: number;
      clampLinesToDocument?: boolean;
      zoomExtents?: { min: number, max: number };
      className?: string;
      style?: React.CSSProperties;
  }

  export interface View {
    scale: number;
    x: number;
    y: number;
  }

  export interface PartialView {
    scale?: number;
    x?: number;
    y?: number;
  }

  export default class CanvasDraw extends React.Component<CanvasDrawProps> {
      /**
       * Returns the drawing's save-data as a stringified object.
       */
      getSaveData(): string;

      /**
       * Loads a previously saved drawing using the saveData string, as well as an optional boolean
       * flag to load it immediately, instead of live-drawing it.
       */
      loadSaveData(saveData: string, immediate?: boolean): void;

      /**
       * Clears the canvas completely.
       */
      clear(): void;

      /**
       * Removes the latest change to the drawing. This includes everything drawn since the last MouseDown event.
       */
      undo(): void;

      eraseAll(): void;

      resetView(): View;

      setView(view: PartialView): View;
  }
}
