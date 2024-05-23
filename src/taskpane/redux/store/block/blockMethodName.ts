/* eslint-disable no-undef */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../root";

interface BlockPayload {
  context?: Excel.RequestContext;
}

const setNamedObjectHandler = async (context: Excel.RequestContext) => {
  const sheet = context.workbook.worksheets.getActiveWorksheet();
  sheet.load("name");
  await context.sync();
  console.log("1", sheet.name);
  const n = sheet.name;

  const namedItem = context.workbook.worksheets.getItem(n).names;
  namedItem.load("items/name");
  await context.sync();

  console.log("named items", namedItem.items);

  const add = context.workbook.worksheets.getItem(n);
  await context.sync();
  add.names.add("InsertedNew", "=B1:B3");
  await context.sync();
  console.log("should be inserted");
};

const getNamedItem = async (context: Excel.RequestContext) => {
  const sheet = context.workbook.worksheets.getActiveWorksheet().names;
  const namedItem = sheet.getItem("bazinga");
  await context.sync();
  console.log("2", namedItem);
};

export const setNamedObject = createAsyncThunk<void, BlockPayload, { dispatch: AppDispatch; state: RootState }>(
  "block/setNamedObject",
  async ({ context }) => {
    if (context) {
      await setNamedObjectHandler(context);

      await getNamedItem(context);
    } else {
      await Excel.run(async (context) => {
        try {
          await setNamedObjectHandler(context);
          await getNamedItem(context);
        } catch (error) {
          console.error(error);
        }
      });
    }
  }
);
