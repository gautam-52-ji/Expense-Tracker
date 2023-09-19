import { Request, Response } from "express";
import {
  addExpense,
  deleteExpense,
  getExpense,
  updateExpense,
} from "../services/expenseServices";

const getExpenseController = async (req: Request, res: Response) => {
  const getAllExpenses = await getExpense();
  res.json(getAllExpenses);
};

const addExpenseController = async (req: Request, res: Response) => {
  const addNewExpense = await addExpense(req.body);

  res.json(addNewExpense);
};

const updateExpenseController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount, date, description } = req.body;
  const newExpense = {
    amount: amount,
    date: date,
    description: description,
  };
  const updateOldExpense = await updateExpense(id, newExpense);
  res.json(updateOldExpense);
};

const deleteExpenseController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const addNewExpense = await deleteExpense(id);
  res.json(addNewExpense);
};

export {
  getExpenseController,
  addExpenseController,
  updateExpenseController,
  deleteExpenseController,
};
