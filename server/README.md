# Portfolio Contact Form Backend

This is the backend service for the portfolio contact form that handles message sending via email.

## Setup

### Prerequisites
- Node.js (v18 or higher)
- A Gmail account with App Password enabled

### Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
   - `SMTP_USER`: Your Gmail address
   - `SMTP_PASS`: Your Gmail App Password (not regular password)
   - `SMTP_TO`: Email address to receive contact form messages (usually your email)

### Gmail App Password Setup

1. Enable 2-factor authentication on your Gmail account
2. Go to Google Account settings > Security > App passwords
3. Generate an app password for "Mail"
4. Use this app password in the `SMTP_PASS` environment variable

### Development

```bash
npm run dev
```

The server will start on port 3001.

### Production

```bash
npm start
```

## API Endpoints

### POST /api/contact
Send a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Hello",
  "message": "Your message here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

### GET /api/health
Health check endpoint.

## Deployment

For production deployment, you can use services like:
- Vercel (with Serverless Functions)
- Netlify (with Functions)
- Railway
- Heroku
- Digital Ocean App Platform

Make sure to set the environment variables in your hosting provider's settings.

## Rate Limiting

The API includes rate limiting:
- 5 requests per 15 minutes per IP address
- Prevents spam and abuse

## Security Features

- Helmet.js for security headers
- CORS configuration
- Input validation with Joi
- Rate limiting
- Error handling without exposing internal details