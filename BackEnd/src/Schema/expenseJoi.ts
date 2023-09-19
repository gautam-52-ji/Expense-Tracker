import Joi from "joi";

const expenseSchema = Joi.object({
  amount: Joi.string().required(),
  date: Joi.string(),
  description: Joi.string().required().email(),
});

export { expenseSchema };
