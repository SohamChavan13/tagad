import express from 'express';
import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// Contact page
router.get('/', (req, res) => {
  res.render('contact', {
    title: 'Contact Us | Tagad Platforms',
    currentPage: 'contact',
    metaDescription: 'Get in touch with Tagad Platforms for your software development and digital marketing needs.',
    success: req.query.success,
    error: req.query.error
  });
});

// Handle contact form submission
router.post('/submit', async (req, res) => {
  try {
    const {
      name,
      email,
      company,
      phone,
      service,
      message,
      budget,
      timeline
    } = req.body;

    // Create new contact
    const contact = new Contact({
      name,
      email,
      company,
      phone,
      service,
      message,
      budget,
      timeline
    });

    await contact.save();

    // Send email notification (optional)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission - ${service}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
          <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
          <p><strong>Message:</strong><br>${message}</p>
        `
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }
    }

    res.redirect('/contact?success=1');
  } catch (error) {
    console.error('Contact form error:', error);
    res.redirect('/contact?error=1');
  }
});

export default router;