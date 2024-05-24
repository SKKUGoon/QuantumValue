/* eslint-disable no-undef */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../root";
import { ExcelCellAddress, ExcelRangeAddress, ExcelSheet } from "../../util/address";
import { QBlock, QBlockContent, QBlockProp } from "./dtypes";

interface BlockPayload {
  context?: Excel.RequestContext;
}

/* Set Named Object */

export interface SetBlockPayload extends BlockPayload {
  blockConfig: QBlockProp;
}

export type SetBlockResultPayload = {
  blockname: string;
  targetSheet: ExcelSheet;
  targetRange: ExcelCellAddress | ExcelRangeAddress;
};

const setNamedObjectHandler = async ({ context, blockConfig }: SetBlockPayload): Promise<SetBlockResultPayload> => {
  if (!context) return;

  // Setup Block from config
  const newBlock = new QBlock(blockConfig);
  const blockNm = newBlock.toBlockKey();
  const blockSheet = newBlock.onSheet;
  const blockRange = newBlock.getBlockRange();

  console.log(blockNm, blockSheet, blockRange, newBlock, blockConfig);

  let sheet: Excel.Worksheet;
  let sheetNamedItems: Excel.NamedItemCollection;
  if (newBlock.onSheet) {
    sheet = context.workbook.worksheets.getItem(newBlock.onSheet);
    sheetNamedItems = context.workbook.worksheets.getItem(newBlock.onSheet).names;
  } else {
    sheet = context.workbook.worksheets.getActiveWorksheet();
    sheetNamedItems = context.workbook.worksheets.getActiveWorksheet().names;
  }

  sheetNamedItems.load("items/name");
  await context.sync();

  console.log("named items", sheetNamedItems.items);

  // Add target Range
  sheet.names.add(blockNm, `=${newBlock.getBlockRange()}`);
  await context.sync();

  return { blockname: blockNm, targetSheet: blockSheet, targetRange: blockRange };
};

export const setNamedObject = createAsyncThunk<
  SetBlockResultPayload,
  SetBlockPayload,
  { dispatch: AppDispatch; state: RootState }
>("block/setNamedObject", async ({ context, blockConfig }) => {
  if (context) {
    return await setNamedObjectHandler({ context, blockConfig });
  } else {
    await Excel.run(async (context) => {
      try {
        return await setNamedObjectHandler({ context, blockConfig });
      } catch (error) {
        console.error(error);
      }
    });
  }
});

/* Get Named Object */

export interface GetBlockPayload extends BlockPayload {
  blockName: string;
  targetSheet: string;
}

const getNamedObjectHandler = async ({ context, blockName, targetSheet }: GetBlockPayload) => {
  if (!context) return;

  const sheet = context.workbook.worksheets.getItem(targetSheet).names;
  sheet.load("items/name");
  await context.sync();

  console.log(sheet.items, blockName);
};

export const getNamedObject = createAsyncThunk<void, GetBlockPayload, { dispatch: AppDispatch; state: RootState }>(
  "block/getNamedObject",
  async ({ context, blockName, targetSheet }) => {
    if (context) {
      await getNamedObjectHandler({ context, blockName, targetSheet });
    } else {
      await Excel.run(async (context) => {
        try {
          await getNamedObjectHandler({ context, blockName, targetSheet });
        } catch (error) {
          console.error(error);
        }
      });
    }
  }
);

/* Get Named Object's Content */

const getNamedObjectContentHandler = async ({
  context,
  blockName,
  targetSheet,
}: GetBlockPayload): Promise<QBlockContent> => {
  if (!context) return;
  console.log("here");
  const sheet = context.workbook.worksheets.getItem(targetSheet).names;
  sheet.load();
  await context.sync();

  const namedItem = sheet.getItem(blockName).getRange();
  namedItem.load("values, formulas");
  await context.sync();

  return {
    values: namedItem.values,
    formulas: namedItem.formulas,
  };
};

// const getMultiNamedObjectContentHandler = async (context: Excel.RequestContext, blocks: GetBlockPayload[]) => {
//   if (!context) return;

//   // sort by sheet
//   console.log(blocks);
// };

export const getNamedObjectContent = createAsyncThunk<
  QBlockContent,
  GetBlockPayload,
  { dispatch: AppDispatch; state: RootState }
>("block/getNamedObjectContent", async ({ context, blockName, targetSheet }) => {
  if (context) {
    return await getNamedObjectContentHandler({ context, blockName, targetSheet });
  } else {
    return await Excel.run(async (context) => {
      try {
        return await getNamedObjectContentHandler({ context, blockName, targetSheet });
      } catch (error) {
        console.error(error);
      }
    });
  }
});
