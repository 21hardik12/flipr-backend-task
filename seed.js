const mongoose = require('mongoose');
const User = require('./models/User');
const Expense = require('./models/Expense');
const Category = require('./models/Category');
const bcrypt = require('bcrypt');
require('dotenv').config();
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Sample user data
const users = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('password123', 10)
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    password: bcrypt.hashSync('password456', 10)
  },
];

// Sample category data
const categories = [
  { name: 'Food' },
  { name: 'Transportation' },
  { name: 'Entertainment' },
  { name: 'Utilities' },
  { name: 'Housing' },
  { name: 'Shopping' },
];

// Sample expense data
const expenses = [
  {
    title: 'Groceries',
    date: new Date('2023-05-01'),
    amount: 75.50,
    category: 'Food',
  },
  {
    title: 'Rent',
    date: new Date('2023-05-05'),
    amount: 1000,
    category: 'Housing',
  },
  {
    title: 'Movie Tickets',
    date: new Date('2023-05-10'),
    amount: 25,
    category: 'Entertainment',
  },
];

// Seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Category.deleteMany();
    await Expense.deleteMany();

    // Create users
    const createdUsers = await User.create(users);

    // Create categories and associate them with users
    for (const category of categories) {
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      category.user = randomUser._id;
      await Category.create(category);
    }

    // Create expenses and associate them with users and categories
    for (const expense of expenses) {
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      const randomCategory = await Category.findOne({ user: randomUser._id });
      expense.user = randomUser._id;
      expense.category = randomCategory._id;
      await Expense.create(expense);
    }

    console.log('Database seeded successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.disconnect();
  }
};

seedDatabase();