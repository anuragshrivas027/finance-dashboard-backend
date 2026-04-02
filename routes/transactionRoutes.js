import express from "express";
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Create → Admin + Analyst
router.post("/", protect, authorizeRoles("admin", "analyst"), createTransaction);

// Read → All
router.get("/", protect, authorizeRoles("admin", "analyst", "viewer"), getTransactions);

// Update → Admin only
router.put("/:id", protect, authorizeRoles("admin"), updateTransaction);

// Delete → Admin only
router.delete("/:id", protect, authorizeRoles("admin"), deleteTransaction);

export default router;