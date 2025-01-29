import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message, subject } = req.body;

    // Save contact form submission
    const contact = new Contact({
      name,
      email,
      message,
      subject
    });
    await contact.save();

    // Send email notification
    const transporter = nodemailer.createTransport({
      // Configure your email service
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // await transporter.sendMail({
    //   from: process.env.EMAIL_USER,
    //   to: 'support@careercounseling.com',
    //   subject: `New Contact Form Submission: ${subject}`,
    //   html: `
    //     <h3>New Contact Form Submission</h3>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Message:</strong> ${message}</p>
    //   `
    // });

    res.status(201).json({
      message: 'Contact form submitted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting contact form' });
  }
};