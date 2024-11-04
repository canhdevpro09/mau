const nodemailer = require('nodemailer');


    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'phanhuucanh123@gmail.com',
            pass: 'qqxoecwolweexyuf',
        },
    });


module.exports = {transporter};