/* eslint-disable no-undef */
export type ExcelSheet = string;
export type ExcelCellAddress = string;
export type ExcelRangeAddress = string;

export type ExcelCellIndex = [number, number];
export type ExcelRangeIndex = [number, number, number, number];

export const CellPropDefault = {
  // style:true,
  format: {
    autoIndent: true,
    borders: {
      style: true,
      color: true,
      weight: true,
      tintAndShade: true,
    },
    fill: {
      color: true,
      pattern: true,
      // patternColor:true,
      // patternTintAndShade:true,
      // tintAndShade:true
    },
    font: {
      bold: true,
      color: true,
      italic: true,
      name: true,
      // strikethrough:true,
      // subscript:true,
      // superscript:true,
      // tintAndShade:true,
      underline: true,
      size: true,
    },
    horizontalAlignment: true,
    indentLevel: true,
    // protection:true,
    // readingOrder:true,
    shrinkToFit: true,
    textOrientation: true,
    // useStandardHeight:true,
    // useStandardWidth:true,
    verticalAlignment: true,
    wrapText: true,
  },
};

export class QuantumParse {
  static parseEngRange(input: string): string[][] {
    const re = /[A-Z]+[0-9]+(?=:)|(?<=:)[A-Z]+[0-9]+|^[A-Z]+[0-9]+$/g;
    const cellMatch = input.match(re);

    if (!cellMatch) return [];

    const cells = cellMatch.map((cell) => {
      const match = cell.match(/([A-Z]+)([0-9]+)/);
      if (!match) return ["", ""];
      return [match[1], match[2]] as [string, string];
    });

    return cells;
  }

  static columnToIndex(colStr: string) {
    let index = 0;
    for (let i = 0; i < colStr.length; i++) {
      const charCd = colStr.charCodeAt(i) - "A".charCodeAt(0) + 1;
      index = index * 26 + charCd;
    }
    return index - 1; // Convert to 0 based index
  }

  static rowToIndex(rowStr: string) {
    return parseInt(rowStr) - 1;
  }
}

export class QuantumAddress {
  constructor() {}
}
