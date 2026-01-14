const express = require("express");
const Expense = require("../models/Expense");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @route   POST /api/expenses
 * @desc    Add new expense
 * @access  Private
 */
router.post("/", protect, async (req, res) => {
  try {
    const { amount, category, description, date, type } = req.body;

    const expense = await Expense.create({
      user: req.user.id,
      amount,
      category,
      description,
      date,
      type,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Failed to add expense" });
  }
});

/**
 * @route   GET /api/expenses
 * @desc    Get all expenses of logged-in user
 * @access  Private
 */
router.get("/", protect, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
});

/**
 * @route   GET /api/expenses/summary
 * @desc    Get income, expense totals & balance
 * @access  Private
 */
router.get("/summary", protect, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });

    let totalIncome = 0;
    let totalExpense = 0;

    expenses.forEach((item) => {
      if (item.type === "income") {
        totalIncome += item.amount;
      } else if (item.type === "expense") {
        totalExpense += item.amount;
      }
    });

    res.status(200).json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expense summary" });
  }
});

/**
 * @route   PUT /api/expenses/:id
 * @desc    Update an expense
 * @access  Private
 */
router.put("/:id", protect, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Ownership check
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { amount, category, description, date, type } = req.body;

    expense.amount = amount ?? expense.amount;
    expense.category = category ?? expense.category;
    expense.description = description ?? expense.description;
    expense.date = date ?? expense.date;
    expense.type = type ?? expense.type;

    const updatedExpense = await expense.save();

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: "Failed to update expense" });
  }
});

/**
 * @route   DELETE /api/expenses/:id
 * @desc    Delete an expense
 * @access  Private
 */
router.delete("/:id", protect, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await expense.deleteOne();

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
