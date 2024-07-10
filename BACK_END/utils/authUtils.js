const nodemailer = require('nodemailer');

exports.generateOTP = function(length) {
  let digits = '0123456789';
  return Array.from(
    { length },
    () => digits[Math.floor(Math.random() * 10)]
  ).join('');
}

exports.sendVerificationEmail = async function(options){
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

exports.sendVerificationEmail1 = async function(options){
    const transporter = nodemailer.createTransport({
        service:'gmail',
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "hungphu2151@gmail.com",
          pass: "",
        },
    });
  
    const message = {
    //   from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      from: '"Mạng Xã Hội" <noreply@socialmedia.com>',
      to: options.gmail,
      subject: options.subject,
      html: options.message,
    };
  
    await transporter.sendMail(message);
  }