  require("dotenv").config();
  const express = require("express");
  const cors = require("cors");
  const authRoutes = require("./routes/authRoutes");
  const feedbackRoutes = require("./routes/feedbackRoutes");
  const app = express();
  app.use(express.json());
  app.use(cors());

  // ✅ Routes
  app.use("/", authRoutes);
  app.use("/feedback", feedbackRoutes);
  // ✅ Start Server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
