const db = require("../config/db");

// ✅ Submit feedback
exports.submitFeedback = (req, res) => {
  const user_id = req.user?.id;
  const { category, stars, comment } = req.body;

  if (!category || !stars || !comment) {
    return res.status(400).json({ error: "All fields are required" });
  }

  console.log("➡️ User ID from JWT:", user_id);
  console.log("➡️ Feedback Data:", req.body);

  const sql =
    "INSERT INTO feedback (user_id, category, stars, comment) VALUES (?, ?, ?, ?)";
  db.query(sql, [user_id, category, stars, comment], (err, result) => {
    if (err) {
      console.error("❌ MySQL Error:", err);
      return res.status(500).json({
        error: "Database error",
        details: err.sqlMessage,
        code: err.code,
      });
    }
    res.json({ message: "✅ Feedback submitted successfully!" });
  });
};

// ✅ Get feedback for logged-in user
exports.getUserFeedback = (req, res) => {
  const user_id = req.user.id;
  const sql =
    "SELECT * FROM feedback WHERE user_id = ? ORDER BY created_at DESC";
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error("❌ Get Feedback Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ feedback: results });
  });
};
