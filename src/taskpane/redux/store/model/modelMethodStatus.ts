/* eslint-disable no-undef */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../root";

interface StatusPayload {
  context?: Excel.RequestContext;
  calcMode?: Excel.CalculationMode; // Automatic, AutomaticExceptTables and Manual
}

const calcModeHandler = async (
  context: Excel.RequestContext,
  changeMode?: Excel.CalculationMode
): Promise<Excel.CalculationMode | "Automatic" | "AutomaticExceptTables" | "Manual"> => {
  try {
    const calc = context.workbook.application;
    calc.load("calculationMode");
    await context.sync();

    if (changeMode) {
      calc.calculationMode = changeMode;
      await context.sync();
      return changeMode;
    }

    return calc.calculationMode;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const focusedSheetHandler = async (context: Excel.RequestContext): Promise<string> => {
  try {
    const current = context.workbook.worksheets.getActiveWorksheet();
    current.load("name");
    await context.sync();

    return current.name;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getModelSheetsHandler = async (context: Excel.RequestContext): Promise<string[]> => {
  try {
    const modelSheets = context.workbook.worksheets;
    modelSheets.load("items/name");
    await context.sync();

    return modelSheets.items.map((worksheets) => worksheets.name);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const calcMode = createAsyncThunk<void, StatusPayload, { dispatch: AppDispatch; state: RootState }>(
  "model/calcMode",
  async ({ context, calcMode }) => {
    if (context) {
      await calcModeHandler(context, calcMode);
    } else {
      await Excel.run(async (context) => await calcModeHandler(context, calcMode));
    }
  }
);

export const focusedSheet = createAsyncThunk<void, StatusPayload, { dispatch: AppDispatch; state: RootState }>(
  "model/focused",
  async ({ context }) => {
    if (context) {
      await focusedSheetHandler(context);
    } else {
      await Excel.run(async (context) => await focusedSheetHandler(context));
    }
  }
);

export const getModelSheets = createAsyncThunk<void, StatusPayload, { dispatch: AppDispatch; state: RootState }>(
  "model/getModelSheets",
  async ({ context }) => {
    if (context) {
      await getModelSheetsHandler(context);
    } else {
      await Excel.run(async (context) => await getModelSheetsHandler(context));
    }
  }
);
