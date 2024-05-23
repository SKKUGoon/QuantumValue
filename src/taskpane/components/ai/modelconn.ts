/* eslint-disable no-constant-condition */
/* eslint-disable no-undef */
const MAXCHATHISTORY = 30;

interface ModelChat {
  model: string;
  message: ChatRecord[];
}

export type ChatRecord = {
  role: "user" | "assistant" | "system";
  content: string;
};

export class ModelOrder implements ModelChat {
  model: string; // For now
  message: ChatRecord[];

  isSysPrompt: boolean;

  constructor() {
    this.model = "phi3";
    this.message = [];

    this.isSysPrompt = false;
  }

  context(sysmsg: string) {
    const sys: ChatRecord = { role: "system", content: sysmsg };

    console.log(`[AI] >>> System prompt inserted: ${sysmsg}`);
    this.message = [sys, ...this.message];
    this.isSysPrompt = true;
  }

  ask(question: string) {
    const user: ChatRecord = { role: "user", content: question };

    this.message.push(user);
  }

  private _messageQueueSlice(): void {
    if (this.message.length > MAXCHATHISTORY) {
      if (this.isSysPrompt) {
        const sysPrompt = this.message.at(0); // System prompt is guaranteed to be in 0st place
        const slicedMessage = this.message.slice(1, MAXCHATHISTORY - 1);
        this.message = [sysPrompt, ...slicedMessage];
      } else {
        this.message = this.message.slice(this.message.length - 30, this.message.length);
      }
    }
  }

  /* Request to `Ollama` server with the model */
  async generate() {
    const url = "http://localhost:11434/api/chat";
    const model = "phi3";

    // Update message queue
    this._messageQueueSlice();

    // Ask
    const body: ModelChat = { model: model, message: this.message };
    const reqConfig = { method: "POST", body: JSON.stringify(body) };
    const resps = await fetch(url, reqConfig);

    // Handle the stream of responses
    const reader = resps.body?.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = (await reader?.read()) || {};
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      console.log(chunk);
    }
  }
}
