#!/usr/bin/env python3
"""
Gemini CLI - Simple command-line interface for Google's Gemini AI
Usage: python gemini_cli.py "your question here"
"""

import sys
import os
import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold

def setup_gemini():
    """Setup Gemini with API key from config.json or environment"""
    # Try to get API key from config.json first
    try:
        import json
        with open('config.json', 'r') as f:
            config = json.load(f)
            api_key = config.get('api_key')
            if api_key and api_key != 'YOUR_GEMINI_API_KEY_HERE':
                genai.configure(api_key=api_key)
                return genai.GenerativeModel('gemini-1.5-flash')
    except:
        pass
    
    # Fallback to environment variable
    api_key = os.getenv('GEMINI_API_KEY')
    if api_key:
        genai.configure(api_key=api_key)
        return genai.GenerativeModel('gemini-1.5-flash')
    
    # If no API key found
    print("❌ No Gemini API key found!")
    print("Please either:")
    print("1. Set GEMINI_API_KEY environment variable")
    print("2. Update config.json with your API key")
    print("3. Get your API key from: https://makersuite.google.com/app/apikey")
    return None

def chat_with_gemini(prompt, model):
    """Send prompt to Gemini and return response"""
    try:
        # Configure safety settings to be less restrictive
        safety_settings = {
            HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        }
        
        response = model.generate_content(
            prompt,
            safety_settings=safety_settings,
            generation_config={
                "temperature": 0.7,
                "max_output_tokens": 1000,
            }
        )
        return response.text
    except Exception as e:
        return f"❌ Error: {str(e)}"

def main():
    if len(sys.argv) < 2:
        print("🤖 Gemini CLI")
        print("Usage: python gemini_cli.py 'your question here'")
        print("Example: python gemini_cli.py 'Explain quantum computing'")
        return
    
    prompt = ' '.join(sys.argv[1:])
    
    print("🤖 Initializing Gemini...")
    model = setup_gemini()
    
    if not model:
        return
    
    print(f"💭 Asking: {prompt}")
    print("🤖 Gemini is thinking...")
    
    response = chat_with_gemini(prompt, model)
    print(f"\n✨ Response:\n{response}")

if __name__ == "__main__":
    main()
