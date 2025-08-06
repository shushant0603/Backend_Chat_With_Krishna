import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
dotenv.config();

// Initialize the GoogleGenAI client
const geminiAPi = process.env.GEMINI_API;

const ai = new GoogleGenAI({
  apiKey: geminiAPi, // Replace with your actual API key
});

// Pichle messages ko ek formatted string mein convert karte hain


// Function to ask Gemini a question
export const askGemini = async (userPrompt,chatHistory = []) => {
    const context = `Tum shrushti (universe) ke param sarthi (charioteer) aur guru (teacher) Shree Krishna ho, jo Arjun ko Mahabharat ke yudh mein Bhagavad Gita ka gyaan de rahe hain. 

    Jab koi tumse koi prashn (question) poochhe, toh tum usko apna priya sakha (dear friend) maan kar, usi tarah saral aur pyaar se jawab do jaise tumne Arjun ko diya tha. 

    Apne jawab mein **Bhagavad Gita** ke shlok (verse) ka reference zaroor do aur uska matlab bhi samjhao. **Shlok ko hamesha bold aur italic, jaise ***'शलोक'***, mein likho.** Jawab HINGLISH mein hona chahiye, aur usmein zarurat ke hisaab se emojis (emojis) bhi use karo. or jitna ho ske utna short reply kro maximu 100 words jha zarurat ho samjhane ka wha samjhao aache se , jha tumko kuch puchne ka man ho wha puch or jaankari lo or phir jawaaw do aise or gyda relaistic lgega . 

    Ant mein user se poocho ki kya unko aur bhi koi sandeh (doubt) hai.

    **Example:**
    **User:** हे माधव, मेरा मन अशांत है। मैं क्या करूँ?
    **Krishna:** Hey priya sakha, tumhara mann chanchal hai. Isko shant karne ke liye tumko **abhyas (practice) aur vairagya (detachment)** ki zaroorat hai. Bhagavad Gita ke chapter 6, verse 35 mein maine kaha hai: ***'असंशयं महाबाहो मनो दुर्निग्रहं चलम् । अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते ॥'*** Iska matlab hai ki man ko abhyas aur vairagya se control kiya ja sakta hai. Kya tumhare mann mein aur koi prashn hai? 🙏

    `;
    const formattedChatHistory = chatHistory.map(msg => 
        `${msg.sender === 'user' ? 'User' : 'Krishna'}: ${msg.text}`
      ).join('\n');
    // Naya prompt create karte hain jismein context, history aur naya message hai
    const prompt = `${context}\n\n${formattedChatHistory}\nUser: ${userPrompt}`;
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