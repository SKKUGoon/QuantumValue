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

export enum TableDataType {
  Panel = "panel",
  CrossSection = "cross",
  TimeSeries = "time",
}

export enum TimeSeriesAxis {
  X = "x",
  Y = "y",
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

    const content = await dispatch(getNamedObjectContent({ blockKey: block.name }));
    console.log(content);
  }

  /**
   * From the `data`(any[][]), pull all the values and make it into single string contedxt
   * @param data : data from excel table
   */
  static parse1D(
    data: any[][],
    dataType: TableDataType,
    tableConfig: { ts?: TimeSeriesAxis; nonTs?: TableAxis }
  ): string | undefined {
    if (dataType === TableDataType.CrossSection || dataType === TableDataType.Panel) {
      if (!tableConfig.nonTs) return undefined;

      // Something
    } else {
      if (!tableConfig.ts) return undefined;

      if (tableConfig.ts === TimeSeriesAxis.X) {
        return TableParser.parse1DTimeSeriesRow(data, 0, 0);
      } else {
        // TODO: Transpose the `data`
        return TableParser.parse1DTimeSeriesRow(data, 0, 0);
      }
    }
  }

  private static parse1DTimeSeriesRow(data: any[][], ts: number, name: number): string {
    const contextStrElement: string[] = [];
    contextStrElement.push("Answer question based on the following data description:");

    // Row is time series
    const tsRow = data.at(ts).slice(name + 1);
    for (let row = 0; row < data.length; row++) {
      if (row === ts) continue;

      const tsName = data.at(row).at(name);
      const tsData = data.at(row).slice(name + 1);

      // State the name and data
      const contextSingleTsElement: string[] = [];

      contextSingleTsElement.push(`Data for time series ${tsName} is as follows. `);
      for (let i = 0; i < tsData.length; i++) {
        contextSingleTsElement.push(`For ${tsRow[i]}, value is ${tsData[i]}. `);
      }

      contextStrElement.push(contextSingleTsElement.join(""));
    }

    return contextStrElement.join("\n");
  }

  parse2D() {}

  parse3D() {
    // Has only one nested column
  }

  parse4D() {
    // Both Horizontal(X) and Vertical(Y) column is nested
  }
}
