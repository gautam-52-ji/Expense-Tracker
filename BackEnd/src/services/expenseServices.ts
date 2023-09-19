import _ from "lodash";
import { expenseModel } from "../models/expenseModel";

interface IExpense {
  amount: string;
  date: Date;
  description: string;
}

const getExpense = async () => {
  const expenses = await expenseModel.find();
  return expenses;
};

const addExpense = async (user: IExpense) => {
  const expenseCreated = await expenseModel.create(user);
  if (_.isEmpty(expenseCreated)) {
    return "Not Created";
  } else {
    return "Expense Created";
  }
};

const updateExpense = async (id: string, newExpense: IExpense) => {
  const afterUpdate = await expenseModel.findByIdAndUpdate(id, newExpense);
  if (_.isEmpty(afterUpdate)) {
    return "Not Updated";
  } else {
    return "Expense Updated";
  }
};

const deleteExpense = async (id: string) => {
  const afterDelete = await expenseModel.findByIdAndDelete(id);
  if (_.isEmpty(afterDelete)) {
    return "Not Deleted";
  } else {
    return "Expense Deleted";
  }
};

export { addExpense, getExpense, updateExpense, deleteExpense };
