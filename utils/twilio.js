import twilio from 'twilio';
import crypto from 'crypto';

function sendOTP(number) {
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_TOKEN);

  let otp = '';
  for (let i = 0; i < 6; i++) {
    otp += crypto.randomInt(0, 9).toString();
  }
      const updatednumber=number.replace(0,+92)
  return client.messages.create({
    body: `Your OTP is: ${otp}`,
    from: process.env.TWILIO_NUMBER,
    to: updatednumber
  })
  .then(message => {
    console.log(message.sid);
    return otp; // Return the generated OTP
  })
  .catch(error => {
    console.error('Error sending OTP:', error);
    throw error; // Re-throw the error for handling in the calling function
  });
}

export default sendOTP;