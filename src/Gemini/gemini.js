
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
dotenv.config();


// Initialize the GoogleGenAI client
const geminiAPi=process.env.GEMINI_API;



const ai = new GoogleGenAI({
  apiKey: geminiAPi, // Replace with your actual API key
});

// Function to ask Gemini a question
export const askGemini = async (userPrompt) => {
    const context = `You are a spiritual assistant. Respond to all questions based on the teachings of the Bhagavad Gita. Keep your answers concise and limited to 2-3 lines.`;


  const prompt = `${context}\n\nUser: ${userPrompt}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Use the appropriate Gemini model
      contents: prompt,
    });

    return response.text; // Return the AI-generated response
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    throw new Error("Failed to get a response from Gemini.");
  }
};