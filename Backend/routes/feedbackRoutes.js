const express = require("express");
const router = express.Router();
const { submitFeedback, getUserFeedback } = require("../controllers/feedbackController");
const { verifyToken } = require("../middleware/authMiddleware");

// Protected routes (user must be logged in)
router.post("/submitFeedback", verifyToken, submitFeedback);
router.get("/getUserFeedback", verifyToken, getUserFeedback);

module.exports = router;
