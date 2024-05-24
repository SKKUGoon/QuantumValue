/* eslint-disable no-constant-condition */

import { OllamaResponse } from "src/middle-tier/ollama/llm";

/* eslint-disable no-undef */
const MAXCHATHISTORY = 30;

interface ModelChat {
  model: string;
  messages: ChatRecord[];
  stream: boolean;
}

export type ChatRecord = {
  role: "user" | "assistant" | "system";
  content: string;
};

export class ModelOrder implements ModelChat {
  model: string; // For now
  messages: ChatRecord[];
  stream: boolean;

  isSysPrompt: boolean;

  constructor() {
    this.model = "phi3";
    this.messages = [];
    this.stream = false;

    this.isSysPrompt = false;
  }

  enableStream() {
    this.stream = !this.stream;
  }

  context(sysmsg: string) {
    const sys: ChatRecord = { role: "system", content: sysmsg };

    console.log(`[AI] >>> System prompt inserted: ${sysmsg}`);
    this.messages = [sys, ...this.messages];
    this.isSysPrompt = true;
  }

  ask(question: string) {
    const user: ChatRecord = { role: "user", content: question };

    this.messages.push(user);
  }

  private _messageQueueSlice(): void {
    if (this.messages.length > MAXCHATHISTORY) {
      if (this.isSysPrompt) {
        const sysPrompt = this.messages.at(0); // System prompt is guaranteed to be in 0st place
        const slicedMessage = this.messages.slice(1, MAXCHATHISTORY - 1);
        this.messages = [sysPrompt, ...slicedMessage];
      } else {
        this.messages = this.messages.slice(this.messages.length - 30, this.messages.length);
      }
    }
  }

  /* Request to `Ollama` server with the model */
  async generate(): Promise<OllamaResponse> {
    const url = "https://localhost:3000/llm";
    const model = "phi3";

    // Update message queue
    this._messageQueueSlice();

    // Ask
    const body: ModelChat = { model: model, messages: this.messages, stream: this.stream };
    const reqConfig = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json;charset=utf-8",
      },
    };

    const resps = await fetch(url, reqConfig);
    if (resps.status !== 200) {
      console.error(resps.statusText);
      return;
    }

    const generated = (await resps.json()) as { message: OllamaResponse };
    console.log(generated);

    return generated.message;
  }
}
