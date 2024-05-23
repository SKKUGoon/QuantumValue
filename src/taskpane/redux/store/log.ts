/* eslint-disable no-undef */
import { ModelState } from "./model/model";

export const stolog = (stoState: ModelState, message: string) => {
  if (stoState.debugMode) console.log(`[REDUX] >>> ${message}`);
};
