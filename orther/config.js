const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'phanhuucanh123@gmail.com',
      pass: 'qqxoecwolweexyuf'
    }
  });

module.exports = { transporter };
