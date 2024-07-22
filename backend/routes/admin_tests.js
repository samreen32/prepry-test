const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Tests = require("../models/Tests");
const admin_middleware = require("../middleware/admin_middleware");

// Create Test Route
router.post(
  "/createTest",
  admin_middleware,
  [
    body("title").notEmpty().withMessage("Test title is required"),
    body("description").notEmpty().withMessage("Test description is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;

    try {
      const test = new Tests({ title, description });
      await test.save();
      res.status(201).json({ success: true, message: "Test created successfully", test });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
);

// Get All Tests Route
router.get("/fetchTests", async (req, res) => {
  try {
    const tests = await Tests.find();
    res.status(200).json({ success: true, tests });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


// Update Test Route
router.put(
  "/updateTest/:id",
  admin_middleware,
  [
    body("title").notEmpty().withMessage("Test title is required"),
    body("description").notEmpty().withMessage("Test description is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;

    try {
      const test = await Tests.findByIdAndUpdate(
        req.params.id,
        { title, description },
        { new: true }
      );

      if (!test) {
        return res.status(404).json({ success: false, message: "Test not found" });
      }

      res.status(200).json({ success: true, message: "Test updated successfully", test });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
);

// Delete Test Route
router.delete("/deleteTest/:id", admin_middleware, async (req, res) => {
  try {
    const test = await Tests.findByIdAndDelete(req.params.id);
    if (!test) {
      return res.status(404).json({ success: false, message: "Test not found" });
    }
    res.status(200).json({ success: true, message: "Test deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
