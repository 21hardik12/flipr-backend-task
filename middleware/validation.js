const Joi = require('joi');

const validateExpense = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    date: Joi.date().required(),
    amount: Joi.number().positive().required(),
    category: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  validateExpense,
};