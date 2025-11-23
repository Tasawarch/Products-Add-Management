const jwt = require("jsonwebtoken");
const userService = require("./service");
const User = require("./schema");
const argon2 = require("argon2");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// User Registration
const register = async (req, res) => {
    try {
        // console.log("Received Registration Data:", req.body);
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await userService.findByEmail(email);
        if (existingUser) {
            console.log("User already exists:", existingUser);
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = await userService.registerUser({ username, email, password });
        console.log("User registered successfully:", newUser);

        res.status(201).json({ message: "Registration successful", user: newUser });
    } catch (error) {
        console.error("Error in register:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};
const login = async (req,res) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(403).json({ message: "you may need to signup first" });
    }

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(403).json({ message: "login failed" });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token)
    console.log("✅ User logged in:", user.email);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Error in loginUser:", error.message);
  }
};
module.exports = { register, login };