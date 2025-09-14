# Gemini CLI Tools

This directory contains command-line interface tools for interacting with Google's Gemini AI.

## Available Tools

### 1. Python CLI (`gemini_cli.py`)
- **Usage**: `python3 gemini_cli.py "your question here"`
- **Example**: `python3 gemini_cli.py "Explain quantum computing"`
- **Requirements**: Python 3.7+ with google-generativeai package

### 2. Node.js CLI (`gemini_cli.js`)
- **Usage**: `node gemini_cli.js "your question here"`
- **Example**: `node gemini_cli.js "Explain quantum computing"`
- **Requirements**: Node.js with @google/generative-ai package

## Setup

### 1. Get Your API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key

### 2. Configure API Key

**Option A: Update config.json**
```json
{
  "api_key": "YOUR_ACTUAL_API_KEY_HERE",
  "model": "gemini-1.5-flash",
  "temperature": 0.7,
  "max_tokens": 1000
}
```

**Option B: Set Environment Variable**
```bash
export GEMINI_API_KEY="your_actual_api_key_here"
```

## Usage Examples

### Python CLI
```bash
# Activate virtual environment (if using one)
source gemini-env/bin/activate

# Ask a question
python3 gemini_cli.py "What is machine learning?"

# Ask about coding
python3 gemini_cli.py "How do I implement a binary search in Python?"

# Ask about your portfolio
python3 gemini_cli.py "Help me improve my portfolio website"
```

### Node.js CLI
```bash
# Ask a question
node gemini_cli.js "What is machine learning?"

# Ask about coding
node gemini_cli.js "How do I implement a binary search in JavaScript?"

# Ask about your portfolio
node gemini_cli.js "Help me improve my portfolio website"
```

## Features

- ✅ **Multi-language support** (Python & Node.js)
- ✅ **Config file integration** (uses your existing config.json)
- ✅ **Environment variable support**
- ✅ **Safety settings** (configured for appropriate content filtering)
- ✅ **Error handling** with helpful messages
- ✅ **Easy setup** with clear instructions

## Troubleshooting

### "No Gemini API key found"
- Make sure you've set up your API key using one of the methods above
- Check that your config.json has the correct API key (not the placeholder)

### "Error: [error message]"
- Check your internet connection
- Verify your API key is valid
- Make sure you have the required packages installed

### Python Issues
- Make sure you're using the virtual environment: `source gemini-env/bin/activate`
- Install required packages: `pip install google-generativeai`

### Node.js Issues
- Install required packages: `npm install @google/generative-ai`
- Make sure you're using Node.js 14+ for ES modules support

## Integration with Your Portfolio

These CLI tools are designed to work with your existing portfolio project:
- Uses the same `config.json` file
- Follows the same project structure
- Can be used to generate content for your portfolio
- Perfect for testing AI integration features

## Next Steps

1. Get your API key from Google AI Studio
2. Update your config.json or set the environment variable
3. Test with a simple question
4. Use it to enhance your portfolio content!
