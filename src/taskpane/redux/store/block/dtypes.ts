/* eslint-disable no-undef */
import { QCell, QCellProp, QRange } from "../../../util/address";
import { ExcelRangeAddress } from "../../util/address";

export enum QBlockContentType {
  Data = "data",
  Display = "display",
  VerticalExtendable = "vertical",
  HorizontalExtendable = "horizontal",
}

export interface QBlockProp {
  // Range box start and end
  topleft?: QCellProp;
  botright?: QCellProp;

  name: string;
  onSheet?: string;
  contentType?: QBlockContentType;
}

export type QBlockContent = {
  values: any[][]; // Calculated values
  format?: any[][]; // Cell format
  formulas: any[][]; // Excel functions
};

export class QBlock implements QBlockProp {
  topleft?: QCellProp;
  botright?: QCellProp;

  name: string;
  onSheet?: string;
  contentType?: QBlockContentType;

  // Derived attribute
  startBlock: QCell;
  endBlock: QCell;
  private blockRange: QRange;

  constructor({ topleft, botright, name, onSheet, contentType: content }: QBlockProp) {
    this.topleft = topleft;
    this.botright = botright;
    this.name = name;
    this.onSheet = onSheet;
    this.contentType = content;

    this.init();
  }

  private init() {
    // Create block instance
    this.startBlock = new QCell(this.topleft);
    this.endBlock = new QCell(this.botright);

    // Sheet check
    const cellsSheetMatch = this.startBlock.sheet === this.endBlock.sheet;
    const desigSheetMatch = this.onSheet === this.startBlock.sheet || this.onSheet === this.endBlock.sheet;
    if (this.onSheet && (!cellsSheetMatch || !desigSheetMatch)) {
      console.warn(
        `[QBlock] >>> sheet discrepancy. Onsheet(${this.onSheet}) | Start(${this.startBlock.sheet}) | End(${this.endBlock.sheet})`
      );
    }

    // Create range instance
    this.blockRange = QRange.fromCells({ cells: { start: this.startBlock, end: this.endBlock } });
  }

  toBlockKey(): string {
    // Check for essentials
    if (!this.name || !this.onSheet)
      throw new Error(`[QBlock] >>> no name(${this.name}) or no sheet(${this.onSheet}) defined.`);

    // Set default content type
    if (!this.contentType) this.contentType = QBlockContentType.Display;

    return `${this.onSheet}___${this.name}___${this.contentType}`;
  }

  static fromBlockKey(key: string): QBlock {
    // Sample Block Key:
    // Sheet1___Name
    const [sheet, blockNm, contentType] = key.split("___");

    const blockCls = new QBlock({
      name: blockNm,
      onSheet: sheet,
      contentType: QBlockContentType[contentType],
    });
    return blockCls;
  }

  getBlockRange(): ExcelRangeAddress {
    if (!this.blockRange) return undefined;

    return this.blockRange.address;
  }
}
