// EmailJS Configuration for GitHub Pages deployment
import emailjs from '@emailjs/browser';

// EmailJS configuration
export const EMAILJS_CONFIG = {
  serviceID: 'service_lka4gc7', // Your EmailJS service ID
  templateID: 'template_620c7dp', // Your main template ID (notification to you)
  autoReplyTemplateID: 'template_4g1ylef', // Your auto-reply template ID
  publicKey: 'LH7yf-8bOELlB06_y', // Your EmailJS public key
};

// Initialize EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.publicKey);
};

// Send email function
export const sendContactEmail = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_name: 'Raju Gottumukkala',
      reply_to: formData.email,
    };

    // Send notification email to you
    const notificationResponse = await emailjs.send(
      EMAILJS_CONFIG.serviceID,
      EMAILJS_CONFIG.templateID,
      templateParams
    );

    // Send auto-reply to user (if auto-reply template is configured)
    if (EMAILJS_CONFIG.autoReplyTemplateID && EMAILJS_CONFIG.autoReplyTemplateID !== 'template_YOUR_AUTO_REPLY') {
      try {
        await emailjs.send(
          EMAILJS_CONFIG.serviceID,
          EMAILJS_CONFIG.autoReplyTemplateID,
          templateParams
        );
      } catch (autoReplyError) {
        console.warn('Auto-reply failed, but main email sent:', autoReplyError);
      }
    }

    return {
      success: true,
      message: 'Message sent successfully! You should receive a confirmation email shortly. I\'ll get back to you within 24 hours.',
      data: notificationResponse,
    };
  } catch (error) {
    console.error('EmailJS error:', error);
    throw new Error('Failed to send message. Please try again or contact me directly via email.');
  }
};