import User from "../models/userModel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
  try {
    const { username, email, dob, phone, password } = req.body;

    if (!username || !email || !dob || !phone || !password) {
      return res.status(400).json({ error: "username, email, dob, phone and password are required." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const userDetails = await User.create({
      username,
      email,
      dob,
      phone,
      password: passwordHash,
    });

    res.json(userDetails);
  } catch (error) {
    console.error("Error in registerAdmin:", error);
    res.status(500).json({ error: "An error occurred while creating the user." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required." });
    }

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(401).json({ error: "Authentication failed. User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Authentication failed. Invalid password." });
    }

    const token = jwt.sign(
      { id: foundUser._id, 
        email: foundUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.header('Authorization', token).json({ message: "Login successful", token: token });

  } catch (error) {
    console.error("Error in loginAdmin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { registerUser , loginUser };
