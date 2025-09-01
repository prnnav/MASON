// hooks/useAIChat.ts
import { useState, useCallback } from "react";
import * as Speech from "expo-speech";
import { askAI, AIResponse } from "../services/aiService";

export interface ChatMessage {
  id: string;
  from: "user" | "ai";
  text: string;
  emotion?: string;
}

export function useAIChat(enableVoice: boolean = true) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentEmotion, setCurrentEmotion] = useState<string>("calm");

  // Map emotion to Speech options
  const emotionToSpeechOptions = (emotion?: string) => {
    switch (emotion) {
      case "cheerful": return { pitch: 1.2, rate: 1.1, language: "en-US" };
      case "empathetic": return { pitch: 0.9, rate: 0.9, language: "en-US" };
      case "encouraging": return { pitch: 1.1, rate: 1.05, language: "en-US" };
      case "thoughtful": return { pitch: 0.95, rate: 0.85, language: "en-US" };
      case "calm":
      default: return { pitch: 1.0, rate: 1.0, language: "en-US" };
    }
  };

  const speakText = useCallback(
    (text: string, emotion?: string) => {
      if (!enableVoice || !text.trim()) return;

      const options = emotionToSpeechOptions(emotion || currentEmotion);
      Speech.speak(text, options);
    },
    [enableVoice, currentEmotion]
  );

  const sendMessage = useCallback(
    async (text: string, systemPrompt?: string) => {
      if (!text.trim()) return;

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        from: "user",
        text: text.trim(),
      };
      setMessages((prev) => [...prev, userMsg]);

      setLoading(true);
      setError(null);

      try {
        const aiResp: AIResponse = await askAI(text, systemPrompt);
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          from: "ai",
          text: aiResp.text,
          emotion: aiResp.emotion ?? currentEmotion,
        };

        setMessages((prev) => [...prev, aiMsg]);
        setCurrentEmotion(aiMsg.emotion || currentEmotion);

        // Speak AI message
        speakText(aiMsg.text, aiMsg.emotion);

        return aiMsg;
      } catch (err: any) {
        setError(err.message || "Unknown AI error");
        const errorMsg: ChatMessage = {
          id: (Date.now() + 2).toString(),
          from: "ai",
          text: "⚠️ Error: " + (err.message || "Unknown error"),
        };
        setMessages((prev) => [...prev, errorMsg]);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [speakText, currentEmotion]
  );

  return { messages, loading, error, sendMessage, setMessages };
}
