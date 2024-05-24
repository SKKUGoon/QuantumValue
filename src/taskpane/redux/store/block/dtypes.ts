import { QAddress } from "../../../util/address";

export enum QBlockContent {
  Data,
  Display,
  VerticalExtend,
  HorizontalExtend,
}

export interface QBlockProp {
  // Range box start and end
  topleft?: QAddress;
  botright?: QAddress;

  name?: string;
  generate?: string;
  content?: QBlockContent;
}

export class QBlock implements QBlockProp {
  topleft?: QAddress;
  botright?: QAddress;

  name?: string;
  generate?: string;
  content?: QBlockContent;

  constructor({ topleft, botright, name, generate, content }: QBlockProp) {
    this.topleft = topleft;
    this.botright = botright;
    this.name = name;
    this.generate = generate;
    this.content = content;
  }

  toString(): string {
    return `${this.name}`;
  }
}
