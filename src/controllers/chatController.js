// Simulated database (replace with actual database integration)
import { askGemini } from "../Gemini/gemini.js"; // Adjust path as needed
const messages = [
   
  ];
  
  // Controller to get messages (showcase messages that came)
  export const getMessages = (req, res) => {
    const cameMessages = messages.filter((message) => message.from === 'came');
    res.json(cameMessages);
    console.log(cameMessages);
  };
  
  export const sendMessages = async (req, res) => {
    const { sender, text,chatHistory } = req.body;
  
    if (!sender || !text) {
      return res.status(400).json({ error: "Sender and text are required" });
    }
  
    const newMessage = {
      id: Date.now(),
      from: "sent",
      text,
    };
  
    messages.push(newMessage);
    console.log("User message:", newMessage);
  
    // ✨ Get response from Gemini
    let botText = "Hare Krishna";
    try {
      botText = await askGemini(text,chatHistory);
    } catch (err) {
      console.error("Gemini Error:", err);
      botText = "Sorry, I couldn't understand. Please ask again.";
    }
  
    const botResponse = {
      id: Date.now() + 1,
      from: "came",
      text: botText,
    };
  
    messages.push(botResponse);
    console.log("Bot response:", botResponse);
  
    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
      botResponse,
    });
  };

  // Express.js example

  export const deleteMessages = async (req, res) => {
    try {
      // Assuming messages is an array stored in memory
      messages.length = 0; // Clear the array without reassigning the variable
      res.status(200).json({ message: "Messages cleared successfully" });
    } catch (error) {
      console.error("Error clearing messages:", error);
      res.status(500).json({ error: "Failed to clear messages" });
    }
  };
