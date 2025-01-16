// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3001;

// Check for OpenAI API key
if (!process.env.OPENAI_API_KEY) {
    console.error('Error: Missing OpenAI API key in .env file');
    process.exit(1);
}

// Set up OpenAI configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// CORS middleware
const cors = require('cors');
app.use(cors({
    origin: 'http://127.0.0.1:5501' // Allow requests from this origin
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Route for text generation
app.post('/generate-text', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 500,
        });

        if (response.data.choices) {
            res.json({ message: response.data.choices[0].message.content });
        } else {
            res.json({ message: 'No content received from OpenAI.' });
        }
    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            res.status(error.status).send({ message: error.message });
        } else {
            res.status(500).send({ message: 'An unexpected error occurred.' });
        }
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});