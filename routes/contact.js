const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/contact');

// POST route to handle contact form submissions
router.post('/send-email', async (req, res) => {
    const { firstName, lastName, email, message } = req.body;

    try {
        // Save to database
        const newContact = new Contact({ firstName, lastName, email, message });
        await newContact.save();

        // Configure transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Mail options with backticks for template literals
        const mailOptions = {
            from: `"${firstName} ${lastName}" <${email}>`,
            to: process.env.EMAIL_USER,
            subject: `New Contact Form Submission from ${firstName} ${lastName}`,
            text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).send('Message saved and sent successfully!');
    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
});

module.exports = router;
