const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json({ limit: "10mb" })); // Increase payload size limit for base64 images

// Email sending endpoint
app.post("/send-email", async (req, res) => {
  const { email, image } = req.body;

  if (!email || !image) {
    return res.status(400).send("Email and image are required.");
  }

  try {
    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email provider
      auth: {
        user: "your-email@gmail.com", // Replace with your email
        pass: "your-email-password", // Replace with your email password
      },
    });

    // Send email
    await transporter.sendMail({
      from: '"Bucks to Bar" <your-email@gmail.com>',
      to: email,
      subject: "Your Chart Image",
      html: "<p>Here is your chart image:</p>",
      attachments: [
        {
          filename: "chart.png",
          content: image.split(",")[1], // Extract base64 data
          encoding: "base64",
        },
      ],
    });

    res.status(200).send("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
