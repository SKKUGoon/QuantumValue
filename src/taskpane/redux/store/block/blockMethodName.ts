/* eslint-disable no-undef */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../root";
import { ExcelCellAddress, ExcelRangeAddress, ExcelSheet } from "src/taskpane/util/address";

interface BlockPayload {
  context?: Excel.RequestContext;
}

export interface SetBlockPayload extends BlockPayload {
  blockName: string;
  targetSheet: ExcelSheet;
  targetRange: ExcelCellAddress | ExcelRangeAddress;
}

const setNamedObjectHandler = async ({
  context,
  blockName,
  targetSheet,
  targetRange,
}: SetBlockPayload): Promise<SetBlockPayload> => {
  if (!context) return;

  const sheet = context.workbook.worksheets.getItem(targetSheet);
  const sheetNamedItems = context.workbook.worksheets.getItem(targetSheet).names;
  sheetNamedItems.load("items/name");
  await context.sync();

  console.log("named items", sheetNamedItems.items);

  // Add target Range
  sheet.names.add(blockName, `=${targetRange}`);
  await context.sync();

  return { blockName, targetSheet, targetRange };
};

export const setNamedObject = createAsyncThunk<void, SetBlockPayload, { dispatch: AppDispatch; state: RootState }>(
  "block/setNamedObject",
  async ({ context, blockName, targetSheet, targetRange }) => {
    if (context) {
      await setNamedObjectHandler({ context, blockName, targetSheet, targetRange });
    } else {
      await Excel.run(async (context) => {
        try {
          await setNamedObjectHandler({ context, blockName, targetSheet, targetRange });
        } catch (error) {
          console.error(error);
        }
      });
    }
  }
);

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

const getNamedObjectContentHandler = async ({ context, blockName, targetSheet }: GetBlockPayload) => {
  if (!context) return;
  console.log("here");
  const sheet = context.workbook.worksheets.getItem(targetSheet).names;
  sheet.load();
  await context.sync();

  const namedItem = sheet.getItem(blockName).getRange();
  namedItem.load("values, formulas, format");
  await context.sync();

  console.log("values", namedItem.values, blockName);
  console.log("formulas", namedItem.formulas, blockName);
  console.log("format", namedItem.format, blockName);
};

export const getNamedObjectContent = createAsyncThunk<
  void,
  GetBlockPayload,
  { dispatch: AppDispatch; state: RootState }
>("block/getNamedObjectContent", async ({ context, blockName, targetSheet }) => {
  if (context) {
    await getNamedObjectContentHandler({ context, blockName, targetSheet });
  } else {
    await Excel.run(async (context) => {
      try {
        await getNamedObjectContentHandler({ context, blockName, targetSheet });
      } catch (error) {
        console.error(error);
      }
    });
  }
});

// const getMultiNamedObjectContentHandler = async (context: Excel.RequestContext, blocks: GetBlockPayload[]) => {
//   if (!context) return;

//   // sort by sheet
//   console.log(blocks);
// };
