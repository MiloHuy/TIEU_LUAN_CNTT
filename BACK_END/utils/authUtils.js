const nodemailer = require('nodemailer');

exports.generateOTP = function(length) {
  let digits = '0123456789';
  return Array.from(
    { length },
    () => digits[Math.floor(Math.random() * 10)]
  ).join('');
}

exports.sendVerificationMailTrap = async function(options){
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.gmail,
    subject: options.subject,
    html: options.message,
  };

  await transport.sendMail(message);
}

exports.sendVerificationMail = async function(options){
    const transporter = nodemailer.createTransport({
        service:'gmail',
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: process.env.GMAIL,
          pass: process.env.APP_PW,
        },
    });
  
    const message = {
      from: 'Mạng Xã Hội <${process.env.GMAIL}>',
      to: options.gmail,
      subject: options.subject,
      html: options.message,
    };
  
    await transporter.sendMail(message);
  }