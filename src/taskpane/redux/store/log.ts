/* eslint-disable no-undef */
import { ModelState } from "./model/model";

export const modelLog = (stoState: ModelState, message: string) => {
  if (stoState.debugMode) console.log(`[REDUX] >>> ${message}`);
};
