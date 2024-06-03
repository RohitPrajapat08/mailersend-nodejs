const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Get the MailerSend API key and "from" email from environment variables
const API_KEY = process.env.MAILERSEND_API_KEY;
console.log(API_KEY,".......");
const FROM_EMAIL = process.env.FROM_EMAIL;
console.log(FROM_EMAIL,".............");
const FROM_NAME = process.env.FROM_NAME;
console.log(FROM_NAME,".............");

// API endpoint for sending emails
app.post('/send-email', async (req, res) => {
  const { to, subject, text, html } = req.body;

  try {
    const response = await axios.post(
      'https://api.mailersend.com/v1/email',
      {
        from: { email: FROM_EMAIL, name: FROM_NAME },
        to,
        subject,
        text,
        html,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    console.log(response , "...................");
    res.json({ success: true, message: 'Email sent successfully', data: response.data });

  } catch (error) {
    res.status(error.response.status).json({ success: false, message: error.response.data });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
