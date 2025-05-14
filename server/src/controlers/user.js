const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const roles = require("../utils/constent");

// Utility function to generate JWT tokens
const generateToken = (user) => {
  const accessToken = jwt.sign(
    {
      name: user.name,
      email: user.email,
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );

  const refreshToken = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_REFRESH_SECRET_KEY,
    { expiresIn: "30d" }
  );

  return { accessToken, refreshToken };
};

// Register a user or organizer (shared logic)
const registerUserOrOrganizer = async (req, res, next, role = roles.customer) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: `${role} already registered` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });

    await newUser.save();
    res.status(201).json({ message: `${role} registered successfully` });
  } catch (error) {
    next(error);
  }
};

// Register user
const registerUser = (req, res, next) => {
  registerUserOrOrganizer(req, res, next, roles.customer);
};

// Register organizer
const registerOrganizer = (req, res, next) => {
  registerUserOrOrganizer(req, res, next, roles.organizer);
};

// Login user
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not registered" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const { accessToken, refreshToken } = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        role: user.role,
        userId: user._id,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Log out user (implement functionality here)
const logOutUser = async (req, res) => {
  try {
    // Log out logic (invalidate token on client side, no server-side action needed here)
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging out", error: error.message });
  }
};

// Refresh access token
const refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET_KEY,
    (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      // Generate new access token
      const user = { _id: decoded.userId, role: decoded.role }; // Example user object
      const { accessToken } = generateToken(user);

      res.status(200).json({ accessToken });
    }
  );
};

module.exports = {
  registerUser,
  loginUser,
  logOutUser,
  registerOrganizer,
  refreshAccessToken,
};
