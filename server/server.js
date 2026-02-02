import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import Joi from 'joi';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://rajugottumukkala.com', 'https://www.rajugottumukkala.com']
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many contact form submissions, please try again later.'
  }
});

app.use('/api/contact', limiter);
app.use(express.json({ limit: '10mb' }));

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Validation schema
const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name must be less than 100 characters',
    'any.required': 'Name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  subject: Joi.string().min(5).max(200).required().messages({
    'string.min': 'Subject must be at least 5 characters long',
    'string.max': 'Subject must be less than 200 characters',
    'any.required': 'Subject is required'
  }),
  message: Joi.string().min(10).max(2000).required().messages({
    'string.min': 'Message must be at least 10 characters long',
    'string.max': 'Message must be less than 2000 characters',
    'any.required': 'Message is required'
  })
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.post('/api/contact', async (req, res) => {
  try {
    // Validate input
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.details.map(detail => detail.message)
      });
    }

    const { name, email, subject, message } = value;

    // Create email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #007bff; margin-top: 0;">Contact Details</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
        </div>

        <div style="background: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
          <h3 style="color: #007bff; margin-top: 0;">Message</h3>
          <p style="line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
        </div>

        <div style="margin-top: 30px; padding: 20px; background: #e9ecef; border-radius: 5px;">
          <p style="margin: 0; font-size: 14px; color: #6c757d;">
            This message was sent from your portfolio contact form at ${new Date().toLocaleString()}.
          </p>
        </div>
      </div>
    `;

    const emailText = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Sent at: ${new Date().toLocaleString()}
    `;

    // Send email
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: `Portfolio Contact: ${subject}`,
      text: emailText,
      html: emailHtml,
      replyTo: email
    };

    await transporter.sendMail(mailOptions);

    // Send confirmation email to sender
    const confirmationOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #007bff;">Thank you for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>I've received your message and will get back to you within 24 hours.</p>
          <p>Here's a copy of what you sent:</p>

          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p style="margin-left: 10px;">${message.replace(/\n/g, '<br>')}</p>
          </div>

          <p>Best regards,<br>Raju Gottumukkala</p>
        </div>
      `
    };

    await transporter.sendMail(confirmationOptions);

    res.json({
      success: true,
      message: 'Message sent successfully! You should receive a confirmation email shortly.'
    });

  } catch (error) {
    console.error('Contact form error:', error);

    // Don't expose internal errors to client
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later or contact me directly via email.',
      ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});