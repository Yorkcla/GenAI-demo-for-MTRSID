// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Validate OpenAI API key
if (!process.env.OPENAI_API_KEY) {
    console.error('Error: Missing OpenAI API key in .env file');
    process.exit(1);
}

// Set up OpenAI configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// CORS middleware
app.use(cors({
    origin: 'http://127.0.0.1:5501', // Replace with your frontend origin
    credentials: true,
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to handle JSON parsing errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
        return res.status(400).json({ error: 'Invalid JSON in request body' });
    }
    next();
});

// Route for text generation
app.post('/generate-text', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4', // Replace with a valid model name
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 500,
        });

        res.json({
            message: response.choices[0].message.content, // Send only the message content
        });
    } catch (error) {
        console.error('Error during OpenAI API call:', error); // Log errors
        if (error instanceof OpenAI.APIError) {
            res.status(error.status).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred.' });
        }
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
    console.error('Error starting server:', err.message);
});
