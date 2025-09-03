    const express = require("express");
    const router = express.Router();
    const { signup, login, profile } = require("../controllers/authController");
    const { verifyToken } = require("../middleware/authMiddleware");

  

    // Routes
    router.post("/signup", signup);
    router.post("/login", login);
    router.get("/profile", verifyToken, profile);

    module.exports = router;
