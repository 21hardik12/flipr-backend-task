const express = require('express');
const Expense = require('../models/Expense');
const { validateExpense } = require('../middleware/validation');

const router = express.Router();

// Add a new expense
router.post('/', validateExpense, async (req, res) => {
  try {
    const { title, date, amount, category } = req.body;
    const expense = new Expense({
      title,
      date,
      amount,
      category,
      user: req.user._id,
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a paginated list of expenses
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const expenses = await Expense.find({ user: req.user._id })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    res.json(expenses);
  } catch (error) {
    console.error('Error retrieving expenses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get expenses grouped by category
router.get('/grouped', async (req, res) => {
  try {
    const { month } = req.query;
    const groupedExpenses = await Expense.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: '$category',
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);
    res.json(groupedExpenses);
  } catch (error) {
    console.error('Error retrieving grouped expenses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get monthly expense data for a specific category
router.get('/category/:categoryId/monthly', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const monthlyExpenses = await Expense.aggregate([
      {
        $match: {
          user: req.user._id,
          category: categoryId,
        },
      },
      {
        $group: {
          _id: { $dayOfMonth: '$date' },
          totalAmount: { $sum: '$amount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(monthlyExpenses);
  } catch (error) {
    console.error('Error retrieving monthly expenses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;