import express from 'express';
import {deleteMessages, getMessages,sendMessages} from '../controllers/chatController.js';

const router = express.Router();

router.get('/chat',getMessages);

router.post('/chat',sendMessages);
router.delete('/messages',deleteMessages)

// app.delete('/api/messages', (req, res) => {
//     messages = []; // ya jo bhi aapki backend store hai, usse clear karo
//     res.status(200).json({ message: "All messages deleted successfully" });
//   });

export default router;



