import axios from 'axios';
import {IExpense} from '../screens/recentExpenses';

const BACKEND_URL = 'http://localhost:3000/expense';

export const postRequest = async (expenseData: IExpense) => {
  const response = await axios.post(BACKEND_URL + '/add', expenseData);
  const id = response.data._id;
  return id;
};

export const getRequest = async () => {
  const response = await axios.get(BACKEND_URL);

  const expense = [];

  for (const i of response.data) {
    const expenseObj = {
      id: i._id,
      amount: i.amount,
      date: new Date(i.date),
      description: i.description,
    };
    expense.push(expenseObj);
  }
  return expense;
};

export const updateExpense = async (id: string, expenseData: IExpense) => {
  return axios.put(BACKEND_URL + `/updat/${id}`, expenseData);
};

export const deleteExpense = async (id: string) => {
  return axios.delete(BACKEND_URL + `/delet/${id}`);
};
