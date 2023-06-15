const express = require("express");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

exports.sendResetEmail = async (req, res, next) => {
  const email = req.body.email;

  const SENDER_EMAIL = "snypisia@gmail.com";
  const api_name = "stats";
  const sender = { name: api_name, email: SENDER_EMAIL };

  User.findOne({ email: email }).then((user) => {
    if (user) {
      const mailOptions = {
        from: sender,
        to: user.email,
        subject: "Verification",
        text: "Welcome to Mailtrap Sending!",
        html: `<!doctype html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      </head>
      <body style="font-family: sans-serif;">
        <div style="display: block; margin: auto; max-width: 600px;" class="main">
          <a href="http://localhost:3000/password/reset/email=${email}">Click to reset email</a>
        </div>
        <style>
          .main { background-color: white; }
          a:hover { border-left-width: 1em; min-height: 2em; }
        </style>
      </body>
    </html>`,
      };
      const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "9110c24e7dcdf0",
          pass: "e993ad3e7a237b",
        },
      });

      transport.sendMail(mailOptions).catch((err) => console.log(err));

      return res.status(200).send({
        message: "Email is sent",
      });
    } else {
      return res.status(404).send({
        message: "User not exist!",
      });
    }
  });
};

exports.updatePassword = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 12);

  User.findOneAndUpdate(
    { email: email },
    { $set: { password: hashedPassword } },
    (err) => {
      if (!err) {
        res.send("Successfully Updated");
      } else {
        res.send(err);
      }
    }
  );
};
