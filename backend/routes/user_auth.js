const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/UserAuth"); // Adjust the path if necessary
const JWT_SECRET = "Samreenisagoodgir@l";

// Register User Route
router.post(
  "/register",
  [
    body("fullName").not().isEmpty().withMessage("Full Name is required"),
    body("email").isEmail().withMessage("Please include a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("occupation").optional({ checkFalsy: true }).isString().withMessage("Occupation must be a string"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { fullName, email, password, occupation } = req.body;

      let user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({ success: false, message: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = new Users({
        fullName,
        email,
        password: hashedPassword,
        occupation: occupation || null,
      });

      const savedUser = await user.save();

      const payload = {
        user: {
          id: savedUser.id,
        },
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({
        success: true,
        message: "User registered successfully",
        token: token,
        user: savedUser,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
);

// Login User Route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please include a valid email"),
    body("password").exists().withMessage("Password is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      let user = await Users.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid Credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "6h" });

      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        token: token,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage,
        },
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
);

module.exports = router;
