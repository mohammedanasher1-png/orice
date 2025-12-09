import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';

let genAI: GoogleGenAI | null = null;

try {
  // Initialize only if key is available.
  // In a real app, we handle missing keys gracefully in the UI.
  if (process.env.API_KEY) {
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI", error);
}

export const getShoppingAssistantResponse = async (
  query: string,
  currentProduct?: Product
): Promise<string> => {
  if (!genAI) {
    return "I'm sorry, I cannot connect to the AI service right now. Please check the API configuration.";
  }

  const modelId = 'gemini-2.5-flash';
  
  let systemContext = `You are PricePulse AI, a helpful and objective shopping assistant. 
  Your goal is to help users make informed buying decisions.
  Keep answers concise (under 150 words usually) unless asked for a detailed guide.
  Format output with Markdown (bolding key terms, lists).`;

  if (currentProduct) {
    systemContext += `\n\nUser is currently looking at this product:
    Title: ${currentProduct.title}
    Price Range: ${Math.min(...currentProduct.offers.map(o => o.price))} - ${Math.max(...currentProduct.offers.map(o => o.price))} ${currentProduct.offers[0].currency}
    Description: ${currentProduct.description}
    Specs: ${JSON.stringify(currentProduct.specs)}`;
  }

  try {
    const response = await genAI.models.generateContent({
      model: modelId,
      contents: query,
      config: {
        systemInstruction: systemContext,
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });
    
    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error while analyzing that. Please try again later.";
  }
};