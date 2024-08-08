const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

const sendEmailController = (req, res) => {
  try {
    const { name, email, msg } = req.body;

    if (!name || !email || !msg) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const mailOptions = {
      from: 'anishudr1@gmail.com',
      to: 'anishudr1@gmail.com',
      subject: 'Regarding MERN Portfolio App',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${msg}`,
      html: `
        <h5>Detail Information</h5>
        <ul>
          <li><p>Name: ${name}</p></li>
          <li><p>Email: ${email}</p></li>
          <li><p>Message: ${msg}</p></li>
        </ul>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send({
          success: false,
          message: "Failed to send email",
          error: error.message,
        });
      }
      console.log('Email sent:', info.response);
      return res.status(200).send({
        success: true,
        message: "Your message was sent successfully",
      });
    });

  } catch (error) {
    console.error('Send Email API Error:', error);
    return res.status(500).send({
      success: false,
      message: "Send Email API Error",
      error: error.message,
    });
  }
};

module.exports = { sendEmailController };
