const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

 const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (
      !name?.trim() ||
      !email?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Website Contact <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL],
      replyTo: email.trim(),
      subject: `Contact Form: ${subject.trim()}`,
      text: `
Name: ${name.trim()}
Email: ${email.trim()}
Subject: ${subject.trim()}

Message:
${message.trim()}
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return res.status(502).json({
        success: false,
        message: "Failed to send your message. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
      id: data?.id,
    });
  } catch (error) {
    console.error("Contact controller error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = { sendContactMessage };