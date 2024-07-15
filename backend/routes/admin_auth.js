const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admins = require("../models/Admin");
const JWT_SECRET = "Samreenisagoodgir@l";

// Register Admin Route
router.post(
  "/adminRegister",
  [
    body("fullName").not().isEmpty().withMessage("Full Name is required"),
    body("email").isEmail().withMessage("Please include a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { fullName, email, password } = req.body;

      let admin = await Admins.findOne({ email });
      if (admin) {
        return res.status(400).json({ success: false, message: "Admin already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      admin = new Admins({
        fullName,
        email,
        password: hashedPassword,
      });

      const savedAdmin = await admin.save();

      const payload = {
        admin: {
          id: savedAdmin.id,
        },
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({
        success: true,
        message: "Admin registered successfully",
        token: token,
        admin: savedAdmin,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
);

// Login Admin Route
router.post(
  "/adminLogin",
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
      let admin = await Admins.findOne({ email });
      if (!admin) {
        return res.status(400).json({ success: false, message: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid Credentials" });
      }

      const payload = {
        admin: {
          id: admin.id,
        },
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "6h" });

      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        token: token,
        admin: {
          id: admin.id,
          fullName: admin.fullName,
          email: admin.email,
          profileImage: admin.profileImage,
        },
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
);

// Get All Admins Route
router.get("/fetchAdmins", async (req, res) => {
  try {
    const admins = await Admins.find();
    res.status(200).json(admins);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Delete All Admins Route
router.delete("/deleteAdmins", async (req, res) => {
  try {
    await Admins.deleteMany({});
    res.status(200).json({ success: true, message: "All Admins deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
