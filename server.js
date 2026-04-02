import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import { protect } from "./middleware/authMiddleware.js";
import { authorizeRoles } from "./middleware/roleMiddleware.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

// Connect Database
connectDB();

const app = express();

// 🔥 RATE LIMITER (APPLY EARLY)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});

// MIDDLEWARES
app.use(limiter);
app.use(express.json());
app.use(cors());

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);

// 🔐 TEST PROTECTED ROUTE
app.get("/api/protected", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed",
    user: req.user,
  });
});

// 🔐 ROLE-BASED ROUTES

// Admin only
app.get("/api/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ success: true, message: "Admin access granted" });
});

// Admin + Analyst
app.get(
  "/api/analyst",
  protect,
  authorizeRoles("admin", "analyst"),
  (req, res) => {
    res.json({ success: true, message: "Analyst access granted" });
  }
);

// Admin + Analyst + Viewer
app.get(
  "/api/viewer",
  protect,
  authorizeRoles("admin", "analyst", "viewer"),
  (req, res) => {
    res.json({ success: true, message: "Viewer access granted" });
  }
);

// ❗ ERROR HANDLER (ALWAYS LAST)
app.use(errorHandler);

// SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// ✅ EXPORT FOR TESTING
export default app;