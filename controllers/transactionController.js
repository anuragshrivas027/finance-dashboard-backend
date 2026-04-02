import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";

// ✅ CREATE
export const createTransaction = asyncHandler(async (req, res) => {
  const { amount, type, category, date, notes } = req.body;

  if (!amount || !type || !category) {
    res.status(400);
    throw new Error("Amount, type and category are required");
  }

  const transaction = await Transaction.create({
    amount,
    type,
    category,
    date,
    notes,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Transaction created",
    data: transaction,
  });
});

// ✅ GET (FILTER + SEARCH + PAGINATION)
export const getTransactions = asyncHandler(async (req, res) => {
  const {
    type,
    category,
    startDate,
    endDate,
    page = 1,
    limit = 5,
    search,
  } = req.query;

  const query = {
    createdBy: req.user._id,
    isDeleted: false,
  };

  if (type) query.type = type;
  if (category) query.category = category;

  if (startDate && endDate) {
    query.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  // 🔍 SEARCH
  if (search) {
    query.$or = [
      { category: { $regex: search, $options: "i" } },
      { notes: { $regex: search, $options: "i" } },
    ];
  }

  const transactions = await Transaction.find(query)
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Transaction.countDocuments(query);

  res.json({
    success: true,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    data: transactions,
  });
});

// ✅ UPDATE
export const updateTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid transaction ID");
  }

  const transaction = await Transaction.findById(id);

  if (!transaction || transaction.isDeleted) {
    res.status(404);
    throw new Error("Transaction not found");
  }

  if (transaction.createdBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized");
  }

  const updated = await Transaction.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json({
    success: true,
    message: "Transaction updated",
    data: updated,
  });
});

// ✅ SOFT DELETE
export const deleteTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid transaction ID");
  }

  const transaction = await Transaction.findById(id);

  if (!transaction || transaction.isDeleted) {
    res.status(404);
    throw new Error("Transaction not found");
  }

  if (transaction.createdBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized");
  }

  transaction.isDeleted = true;
  await transaction.save();

  res.json({
    success: true,
    message: "Transaction soft deleted",
  });
});

// ✅ OPTIONAL: RESTORE
export const restoreTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid transaction ID");
  }

  const transaction = await Transaction.findById(id);

  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found");
  }

  transaction.isDeleted = false;
  await transaction.save();

  res.json({
    success: true,
    message: "Transaction restored",
  });
});