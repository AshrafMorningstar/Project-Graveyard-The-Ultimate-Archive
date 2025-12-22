/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { GoogleGenAI, Type } from "@google/genai";

// Initialize the client. API_KEY is assumed to be in process.env
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

/**
 * Chat with Gemini. Handles Flash Lite (Fast), Flash (Standard), and Pro (Thinking).
 */
export const chatWithGemini = async (
  prompt: string, 
  modelType: 'fast' | 'standard' | 'thinking' | 'search',
  history: {role: string, parts: {text: string}[]}[] = [],
  imagePart?: { inlineData: { data: string; mimeType: string } }
) => {
  try {
    let modelName = 'gemini-2.5-flash';
    let config: any = {};

    switch (modelType) {
      case 'fast':
        modelName = 'gemini-2.5-flash-lite-latest';
        break;
      case 'search':
        modelName = 'gemini-2.5-flash';
        config.tools = [{ googleSearch: {} }];
        break;
      case 'thinking':
        modelName = 'gemini-3-pro-preview';
        config.thinkingConfig = { thinkingBudget: 32768 };
        break;
      case 'standard':
      default:
        modelName = 'gemini-3-pro-preview'; // Defaulting to robust model for "General Intelligence"
        break;
    }

    // Construct contents
    let contents: any = prompt;
    if (imagePart) {
        // If there's an image, we need to structure it as parts
        contents = {
            parts: [
                imagePart,
                { text: prompt }
            ]
        };
        // Note: Thinking models might have restrictions with images in preview, 
        // but 2.5 Flash / 3 Pro generally support multimodal.
        // If image analysis is specifically requested, we use 3-pro-preview
        if (modelType === 'standard' && imagePart) {
           modelName = 'gemini-3-pro-preview'; 
        }
    }

    const response = await ai.models.generateContent({
      model: modelName,
      contents: contents,
      config: config
    });

    return {
      text: response.text,
      groundingMetadata: response.candidates?.[0]?.groundingMetadata
    };

  } catch (error) {
    console.error("Gemini Chat Error:", error);
    throw error;
  }
};

/**
 * Generate Images using Gemini 3 Pro Image Preview
 */
export const generateImage = async (
    prompt: string, 
    aspectRatio: "1:1" | "3:4" | "4:3" | "16:9" | "9:16", 
    size: "1K" | "2K" | "4K"
) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-image-preview',
            contents: {
                parts: [{ text: prompt }]
            },
            config: {
                imageConfig: {
                    aspectRatio: aspectRatio,
                    imageSize: size
                }
            }
        });

        // Extract image
        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        return null;
    } catch (error) {
        console.error("Image Gen Error:", error);
        throw error;
    }
};

/**
 * Edit Image using Gemini 2.5 Flash Image
 */
export const editImage = async (
    imageBase64: string,
    prompt: string
) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        inlineData: {
                            mimeType: 'image/png', // Assuming PNG for simplicity, usually safe for base64
                            data: imageBase64.replace(/^data:image\/\w+;base64,/, '')
                        }
                    },
                    { text: prompt }
                ]
            }
        });

         // Extract image
         for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        return null;

    } catch (error) {
        console.error("Image Edit Error:", error);
        throw error;
    }
};
