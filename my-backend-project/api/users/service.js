const argon2 = require("argon2");
const User = require("./schema");

// Register a new user
const registerUser = async ({ username, email, password }) => {
  try {
    console.log('Service received:', username, email);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    console.log('Hashing password...');
    const hashedPassword = await argon2.hash(password);

    console.log('Creating new user...');
    const newUser = new User({ name: username, email, password: hashedPassword });
    await newUser.save();

    console.log('User registered:', newUser);
    return { message: "User registered successfully", user: newUser };
  } catch (error) {
    console.error('Error in registerUser:', error.message);
    throw error;
  }
};

// Find user by email
const findByEmail = async (email) => {
  return await User.findOne({ email });
};

// Login user
const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    return { message: "Login successful", user };
  } catch (error) {
    console.error("Error in loginUser:", error.message);
    throw error;
  }
};

module.exports = { registerUser, loginUser, findByEmail };
