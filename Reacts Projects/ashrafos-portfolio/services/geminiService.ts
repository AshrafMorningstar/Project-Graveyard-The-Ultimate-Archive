/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize only if key exists to avoid crash on load if missing (will handle error in UI)
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const sendMessageToGemini = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  if (!ai) {
    return "Error: API Key not configured. Please check your environment variables.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    // We construct a simple prompt with history for context
    // In a real production app, we would use the ChatSession API for better history management
    // But for this stateless service call:
    
    let contextPrompt = "You are a helpful AI assistant inside Ashraf's Portfolio OS. You are witty, professional, and knowledgeable about web development.\n\nConversation History:\n";
    
    history.forEach(msg => {
      contextPrompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.text}\n`;
    });
    
    contextPrompt += `\nUser: ${newMessage}\nAssistant:`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: contextPrompt,
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error communicating with the AI service.";
  }
};
