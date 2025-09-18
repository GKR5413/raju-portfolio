# Contact Form Backend Setup Guide

I've successfully created a complete backend solution for your "Let's Connect" contact form. Here's what has been implemented and how to set it up:

## What's Been Created

### 1. Backend Server (`/server/`)
- **Express.js API** with security middleware (Helmet, CORS, Rate Limiting)
- **Email service** using Nodemailer with Gmail SMTP
- **Input validation** using Joi schema validation
- **Error handling** and proper HTTP responses
- **Confirmation emails** sent to both you and the sender

### 2. Frontend Integration
- Updated Contact.tsx to use real API instead of mock submission
- Added proper error handling and user feedback
- Configured Vite proxy for development

### 3. API Endpoints
- `POST /api/contact` - Send contact form messages
- `GET /api/health` - Health check endpoint

## Setup Instructions

### Step 1: Gmail App Password Setup
1. **Enable 2-Factor Authentication** on your Gmail account
2. Go to [Google Account Security](https://myaccount.google.com/security)
3. Click **App passwords** (under 2-Step Verification)
4. Generate an app password for "Mail"
5. Copy the 16-character password

### Step 2: Configure Environment Variables
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Update the `.env` file with your credentials:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=rajugottumukkala986@gmail.com
   SMTP_PASS=your-16-character-app-password-here
   SMTP_FROM=rajugottumukkala986@gmail.com
   SMTP_TO=rajugottumukkala986@gmail.com
   NODE_ENV=development
   PORT=3001
   ```

### Step 3: Install Dependencies & Start
```bash
# Install backend dependencies (already done)
cd server
npm install

# Start the backend server
npm run dev
```

```bash
# In a new terminal, start the frontend
cd ..
npm run dev
```

## Testing

1. **Backend Health Check**: Visit http://localhost:3001/api/health
2. **Frontend**: Visit http://localhost:5173 and test the contact form
3. **Email Delivery**: Check both your inbox and the sender's email for confirmations

## Features Implemented

### Security
- Rate limiting (5 requests per 15 minutes per IP)
- Input validation and sanitization
- CORS protection
- Security headers with Helmet.js

### Email Features
- **HTML formatted emails** with professional styling
- **Confirmation emails** sent to both parties
- **Reply-to** header set to sender's email for easy responses
- **Timestamp** and contact details included

### Error Handling
- Graceful error messages for users
- Detailed logging for debugging
- Validation feedback for form fields

## Production Deployment

### Option 1: Vercel (Recommended)
1. Deploy frontend to Vercel as usual
2. Convert backend to Vercel serverless functions
3. Set environment variables in Vercel dashboard

### Option 2: Separate Hosting
1. Deploy frontend to Vercel/Netlify
2. Deploy backend to Railway/Heroku/DigitalOcean
3. Update API URL in frontend for production

### Option 3: All-in-One (Railway/Render)
1. Deploy both frontend and backend together
2. Serve static files from Express

## Current Status

✅ Backend server created and tested
✅ Frontend integration completed
✅ API endpoints working correctly
✅ Email service configured (needs Gmail App Password)
✅ Development proxy configured
✅ Security features implemented
✅ Documentation provided

## Next Steps

1. **Set up Gmail App Password** (5 minutes)
2. **Test the complete flow** with real email delivery
3. **Deploy to production** when ready

The contact form is now fully functional and ready for production use once you configure the Gmail App Password!