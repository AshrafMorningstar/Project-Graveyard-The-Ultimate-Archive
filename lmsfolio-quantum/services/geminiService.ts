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

/**
 * @file geminiService.ts
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 LMSFolio Quantum - The Future of Learning
 * "The future is unwritten, but the code is compiled."
 */

import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GeminiModelType, ImageGenConfig } from "../types";

// Ensure API key is available
// Fix: Initialize GoogleGenAI with process.env.API_KEY directly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (
  prompt: string,
  type: GeminiModelType,
  imageContext?: string, // base64
  genConfig?: ImageGenConfig
): Promise<{ text: string; sources?: any[]; generatedImage?: string }> => {
  
  if (!process.env.API_KEY) {
    return { text: "Error: No API Key provided in environment." };
  }

  try {
    switch (type) {
      case GeminiModelType.FAST: {
        // Use Gemini 2.5 Flash Lite for low latency
        const response = await ai.models.generateContent({
          model: 'gemini-flash-lite-latest',
          contents: prompt,
        });
        return { text: response.text || "No response generated." };
      }

      case GeminiModelType.THINKING: {
        // Use Gemini 3 Pro with Thinking Config
        // Max budget 32768 for Pro
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: prompt,
          config: {
            thinkingConfig: { thinkingBudget: 16000 }, // Using conservative high budget
          }
        });
        return { text: response.text || "Thinking process complete, but no text returned." };
      }

      case GeminiModelType.SEARCH: {
        // Use Gemini 2.5 Flash with Google Search
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            tools: [{ googleSearch: {} }]
          }
        });
        
        // Extract grounding chunks for sources
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        const sources = groundingChunks?.map((chunk: any) => chunk.web).filter(Boolean).map((w: any) => ({
          title: w.title,
          url: w.uri
        }));

        return { text: response.text || "", sources };
      }

      case GeminiModelType.VISION: {
        // Use Gemini 3 Pro for Vision/Multimodal
        if (!imageContext) {
            throw new Error("Image context required for vision task.");
        }
        
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: {
            parts: [
              {
                inlineData: {
                  mimeType: 'image/jpeg', // Assuming jpeg for simplicity, can be dynamic
                  data: imageContext
                }
              },
              { text: prompt || "Analyze this image." }
            ]
          }
        });
        return { text: response.text || "" };
      }

      case GeminiModelType.IMAGE_GEN: {
        // Use Gemini 3 Pro Image Preview
        // Need to parse config.
        // Note: The new SDK uses generateContent for image gen on some models, 
        // but let's stick to the generateContent pattern with specific models as requested.
        
        // As per instructions: "Upgrade to gemini-3-pro-image-preview if the user requests high-quality images"
        // And "Call generateContent to generate images with nano banana series models"
        
        const size = genConfig?.size || '1K';
        
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-image-preview',
            contents: {
                parts: [{ text: prompt }]
            },
            config: {
                imageConfig: {
                    imageSize: size, // 1K, 2K, 4K
                    aspectRatio: genConfig?.aspectRatio || "1:1"
                }
            }
        });

        // Iterate parts to find image
        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                const base64 = part.inlineData.data;
                const mime = part.inlineData.mimeType || 'image/png';
                return { text: "Hologram generated successfully.", generatedImage: `data:${mime};base64,${base64}` };
            }
        }
        return { text: "Failed to generate hologram image." };
      }

      default:
        return { text: "System Error: Unknown model type." };
    }
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return { text: `Quantum Interference Detected: ${error.message}` };
  }
};