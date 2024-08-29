import jwt from "jsonwebtoken";

async function createToken(user) {
  try {
    const token = await jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: process.env.EXPIRE }
    );
    return token; 
  } catch (err) {
    console.error("Error generating token:", err);
    
  }
}

export default createToken;
