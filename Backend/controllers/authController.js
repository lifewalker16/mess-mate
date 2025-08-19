const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

// ✅ Signup
exports.signup = async (req, res) => {
  const { full_name, email, password, user_type } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users (full_name, email, password, user_type) VALUES (?, ?, ?, ?)";
    db.query(
      sql,
      [full_name, email, hashedPassword, user_type || "student"],
      (err) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ error: "Email already exists" });
          }
          return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "✅ User registered successfully!" });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Login
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0)
      return res.status(400).json({ error: "User not found" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id, type: user.user_type }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({
      message: "✅ Login successful!",
      token,
      user: {
        id: user.id,
        name: user.full_name,
        type: user.user_type,
      },
    });
  });
};

// ✅ Profile
exports.profile = (req, res) => {
  res.json({ message: "✅ Profile data accessed", user: req.user });
};
