const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const emailConfig = require('./email_config.js');

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailConfig.EMAIL_ADDRESS,
    pass: emailConfig.EMAIL_PASSWORD
  }
});

app.use(bodyParser.json());

app.post('/email', (req, res) => {

  const mailOptions = {
    from: emailConfig.EMAIL_ADDRESS, // sender address
    to: req.body.sendTo, // list of receivers
    subject: 'New message for Lawful', // Subject line
    html: `<p>${req.body.message}</p><p>${req.body.fromName} - ${req.body.fromEmail}</p>`// plain text body
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);
      res.send('email error');
    } else {
      console.log(info);
      res.send('email sent');
    }
  });

});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
