import nodemailer from "nodemailer";

function mailTransfer(email,subject,text,data,current,expire) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: "marianne.abernathy15@ethereal.email",
      pass: "Jr885S32KGzkMfHznF"
    }
  });

  const mailOptions = {
    from: "marianne.abernathy15@ethereal.email",
    to: email,
    subject: subject,
    text: text,
    html: data,
    Date:current,
    Expireddate:expire
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

export default mailTransfer;