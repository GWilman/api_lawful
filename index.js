const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const moment = require('moment');

const port = process.env.PORT || 3000;
// const emailConfig = require('./email_config.js'); // use email_config file for testing locally

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  }
});

app.use(bodyParser.json());

app.post('/email', (req, res) => {

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS, // sender address
    to: req.body.sendTo, // list of receivers
    subject: 'New message received from Lawful website', // Subject line
    html: `<p>Message received from ${req.body.fromName}<br />
          ${req.body.fromEmail}<br />
          ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
          <p>"${req.body.message}"</p>`
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
