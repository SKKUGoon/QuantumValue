/* eslint-disable no-undef */
import { ExcelCellIndex } from "../../redux/util/address";

export enum TableAxis {
  X = "x",
  Y = "y",
  NestedX = "nestedX",
  NestedY = "nestedY",
}

export interface AIParsable {
  // Simple summary regarding the table.
  // Generated with LLM.
  // What is the main thesis of the table?
  summary?: string;

  // Table's textify
  text?: string;
  isParsed: boolean;

  // Parse location and direction
  blockKey?: string;
  manualBlock?: {
    // Use manual block only for development, debugging purpose
    blockKey: string;
    offset?: [number, number];
  };

  manualRange?: {
    // Use manual only for development, debugging purpose
    rangeStart: ExcelCellIndex;
    rangeEnd: ExcelCellIndex;
    offset?: [number, number];
  };
  contentAxis: TableAxis;
}

export class TableParser implements AIParsable {
  summary?: string;
  text?: string;
  isParsed: boolean;
  manualBlock?: {
    blockKey: string;
    offset?: [number, number];
  };
  manualRange?: {
    rangeStart: ExcelCellIndex;
    rangeEnd: ExcelCellIndex;
    offset?: [number, number];
  };
  blockKey?: string;
  contentAxis: TableAxis;

  constructor({ summary, text, isParsed, manualRange: manual, blockKey, contentAxis }: AIParsable) {
    this.summary = summary;
    this.text = text;
    this.isParsed = isParsed;
    this.manualRange = manual;
    this.blockKey = blockKey;
    this.contentAxis = contentAxis;

    this.checkIfManual();
  }

  private checkIfManual() {
    if (this.manualRange || this.manualBlock) {
      console.warn(`[AI] >>> You are using manual location mode. This mode is reserved for debugging`);
    }
  }

  private textify() {}

  private retrieveFromWorkbook() {
    // Something
  }

  private _retrieveManual() {
    if (!this.manualRange) return;

    // const range = `${this.manual.rangeStart}:${this.manual.rangeEnd}`;
  }

  parse1D() {}

  parse2D() {}

  parse3D() {
    // Has only one nested column
  }

  parse4D() {
    // Both Horizontal(X) and Vertical(Y) column is nested
  }
}
