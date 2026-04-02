import Transaction from "../models/Transaction.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getDashboardData = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({
    createdBy: req.user._id,
    isDeleted: false, // ✅ ignore deleted
  });

  let totalIncome = 0;
  let totalExpense = 0;

  const categoryMap = {};
  const monthlyData = {};

  transactions.forEach((tx) => {
    // Income / Expense
    if (tx.type === "income") totalIncome += tx.amount;
    else totalExpense += tx.amount;

    // Category breakdown
    if (!categoryMap[tx.category]) {
      categoryMap[tx.category] = 0;
    }
    categoryMap[tx.category] += tx.amount;

    // Monthly analytics
    const month = new Date(tx.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expense: 0 };
    }

    if (tx.type === "income") {
      monthlyData[month].income += tx.amount;
    } else {
      monthlyData[month].expense += tx.amount;
    }
  });

  const netBalance = totalIncome - totalExpense;

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  res.json({
    success: true,
    totalIncome,
    totalExpense,
    netBalance,
    categoryBreakdown: categoryMap,
    monthlyTrends: monthlyData,
    recentTransactions,
  });
});