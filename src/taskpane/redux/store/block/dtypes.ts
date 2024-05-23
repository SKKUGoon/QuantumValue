import { QuantumAddress } from "../../../util/address";

export enum BlockContent {
  Data,
  Display,
  VerticalExtend,
  HorizontalExtend,
}

export interface BlockProp {
  // Range box start and end
  topleft: QuantumAddress;
  botright: QuantumAddress;

  name: string;
  generate: string;
  content: BlockContent;
}

export class Block implements BlockProp {
  topleft: QuantumAddress;
  botright: QuantumAddress;

  name: string;
  generate: string;
  content: BlockContent;

  constructor() {
    this.topleft = new QuantumAddress();
  }
}
