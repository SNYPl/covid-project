const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { MailtrapClient } = require("mailtrap");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const sgMail = require("@sendgrid/mail");

exports.postSignUp = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const repeatPassword = req.body.repeatPassword;

  const hashedPassword = await bcrypt.hash(password, 12);

  if (password !== repeatPassword) {
    return res.status(401).send("Password doesn't match");
  }

  // const sgMail = require("@sendgrid/mail");
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const SENDER_EMAIL = "snypisia@gmail.com";
  const api_name = "stats";
  const TOKEN = "847f97191598ed21244f63fe9dec1263";
  const sender = { name: api_name, email: SENDER_EMAIL };

  try {
    User.findOne({ $or: [{ username: username }, { email: email }] }).then(
      (userDoc) => {
        if (userDoc) {
          return res.status(400).send("That user already exists!");
        }

        const userToken = { username: username };

        //სატესტო
        // const accessToken = jwt.sign(userToken, "verify", {
        //   expiresIn: "10000000ms",
        // });

        const accessToken = jwt.sign(userToken, "verify");

        const mailOptions = {
          from: sender,
          to: email,
          subject: "Verification",
          text: "Welcome to Mailtrap Sending!",
          html: `<!doctype html>
          <html>
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            </head>
            <body style="font-family: sans-serif;">
              <div style="display: block; margin: auto; max-width: 600px;" class="main">
                <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Welcome ${username}</h1>
                <a href="http://localhost:3000/verified/token=${accessToken}">Click to Verify , link will be valid for 10 minute</a>
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

        const user = new User({
          username: username,
          password: hashedPassword,
          email: email,
          verified: false,
          token: accessToken,
        });
        res.status(200).send("account was created");
        return user.save();
      }
    );
  } catch (err) {
    return res.status(401).send(err);
  }
};

exports.verifyAccount = async (req, res, next) => {
  const token = req.body.token;

  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  try {
    jwt.verify(token, "verify", function (err, decoded) {
      if (err) res.status(403).send({ message: "problem in verify" });
    });

    User.findOneAndUpdate(
      { token: token },
      { $set: { verified: true }, $unset: { token: "" } },
      { new: true },
      (err, doc) => {
        if (err) res.status(401).send("something is wrong in database");
      }
    );

    res.status(200).send("account was verified");
  } catch (err) {
    return res.status(401).send(err);
  }
};

exports.sendVerifyMail = async (req, res, next) => {
  const username = req.body.username;

  const SENDER_EMAIL = "snypisia@gmail.com";
  const api_name = "stats";
  const sender = { name: api_name, email: SENDER_EMAIL };

  User.findOne({ username: username }).then((user) => {
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
          <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Welcome ${username}</h1>
          <a href="http://localhost:3000/verified/token=${user.token}">Click to Verify email , link will be valid for 10 minute</a>
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
  });
};
