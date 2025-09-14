#!/usr/bin/env node
/**
 * Gemini CLI - Node.js version
 * Usage: node gemini_cli.js "your question here"
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

function setupGemini() {
    // Try to get API key from config.json first
    try {
        const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
        const apiKey = config.api_key;
        if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE') {
            return new GoogleGenerativeAI(apiKey);
        }
    } catch (error) {
        // Fallback to environment variable
    }
    
    // Fallback to environment variable
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
        return new GoogleGenerativeAI(apiKey);
    }
    
    console.log("❌ No Gemini API key found!");
    console.log("Please either:");
    console.log("1. Set GEMINI_API_KEY environment variable");
    console.log("2. Update config.json with your API key");
    console.log("3. Get your API key from: https://makersuite.google.com/app/apikey");
    return null;
}

async function chatWithGemini(prompt, genAI) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(prompt, {
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HATE_SPEECH",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_DANGEROUS_CONTENT", 
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                }
            ],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
            }
        });
        
        return result.response.text();
    } catch (error) {
        return `❌ Error: ${error.message}`;
    }
}

async function main() {
    if (process.argv.length < 3) {
        console.log("🤖 Gemini CLI (Node.js)");
        console.log("Usage: node gemini_cli.js 'your question here'");
        console.log("Example: node gemini_cli.js 'Explain quantum computing'");
        return;
    }
    
    const prompt = process.argv.slice(2).join(' ');
    
    console.log("🤖 Initializing Gemini...");
    const genAI = setupGemini();
    
    if (!genAI) {
        return;
    }
    
    console.log(`💭 Asking: ${prompt}`);
    console.log("🤖 Gemini is thinking...");
    
    const response = await chatWithGemini(prompt, genAI);
    console.log(`\n✨ Response:\n${response}`);
}

main().catch(console.error);
