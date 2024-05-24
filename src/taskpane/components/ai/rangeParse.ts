/* eslint-disable no-undef */
import { getNamedObjectContent } from "../../redux/store/block/blockMethodName";
import { QBlock } from "../../redux/store/block/dtypes";
import { AppDispatch } from "../../redux/store/root";
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
  contentAxis?: TableAxis;
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
  contentAxis?: TableAxis;

  constructor({ summary, text, isParsed, manualRange, manualBlock, blockKey, contentAxis }: AIParsable) {
    this.summary = summary;
    this.text = text;
    this.isParsed = isParsed;
    this.manualRange = manualRange;
    this.manualBlock = manualBlock;
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

  async retrieveFromWorkbook(dispatch: AppDispatch) {
    if (this.manualRange) this._retrieveManualRange();

    // For manual block given
    if (this.manualBlock) {
      const block = QBlock.fromBlockKey(this.manualBlock.blockKey);
      await this._retrieveManualBlock(block, dispatch);
    }
  }

  private _retrieveManualRange() {
    if (!this.manualRange) return;

    // const rangeAddress = `${this.manualRange.rangeStart}:${this.manualRange.rangeEnd}`;
  }

  private async _retrieveManualBlock(block: QBlock, dispatch: AppDispatch) {
    if (!this.manualBlock) return;

    const content = await dispatch(getNamedObjectContent({ blockName: block.name, targetSheet: block.onSheet }));
    console.log(content);
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
