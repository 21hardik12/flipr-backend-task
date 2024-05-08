const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

// Get all expense categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id });
    res.json(categories);
  } catch (error) {
    console.error('Error retrieving categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new expense category
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({
      name,
      user: req.user._id,
    });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an expense category
router.delete('/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    await Category.findOneAndDelete({ _id: categoryId, user: req.user._id });
    res.json({ message: 'Expense category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;