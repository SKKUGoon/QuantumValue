/* eslint-disable no-undef */
import { ExcelSheet } from "../../../util/address";

export type SheetStatus = {
  name: ExcelSheet;
  config?: {
    visiblility?: Excel.SheetVisibility;
    tabColor?: string;
  };
};
