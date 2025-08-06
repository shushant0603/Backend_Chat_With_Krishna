import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import cors from 'cors';
import routes from './Routes/routes.js';

// dotenv.config();

const app = express();



// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());
// Middleware to serve static files from the 'public' directo


app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});
app.use('/api',routes);

const PORT=process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000');
});