/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
import { Request, Response } from "express";

export type OllamaResponse = {
  model: string;
  created_at: string;
  message: {
    role: "assistant" | "user" | "system";
    content: string;
  };
  done_reason: string;
  done: boolean;
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
};

export const llmQuery = async (req: Request, res: Response) => {
  try {
    const targetUrl = "http://localhost:11434/api/chat"; // ollama;
    const bodyPassThrough = JSON.stringify(req.body);
    const proxyRes = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: bodyPassThrough,
    });

    if (!proxyRes.body || !(proxyRes.status === 200)) {
      res.status(500).json({ message: "No response body from target URL" });
      return;
    }

    const content = (await proxyRes.json()) as OllamaResponse;

    // Return the complete response back to the original requester
    res.setHeader("Content-Type", proxyRes.headers.get("Content-Type") || "application/json");
    res.status(proxyRes.status).json({ message: content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching and processing data from target URL" });
  }
};
