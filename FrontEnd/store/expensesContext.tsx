import React, {createContext, useReducer} from 'react';
import {IExpense} from '../screens/recentExpenses';

export const ExpensesContext = createContext<any>({
  expenses: [],
  addExpense: ({description, amount, date}: IExpense) => {},
  setExpenses: (expenses: IExpense) => {},
  updateExpense: (id: number) => {},
  deleteExpense: (id: number, {description, amount, date}: IExpense) => {},
});

const expenseReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD':
      return [action.payLoad, ...state];

    case 'SET':
      const reverseExpenseArray = action.payLoad.reverse();
      return reverseExpenseArray;
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense: IExpense) => expense.id === action.payLoad.id,
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = {...updatableExpense, ...action.payLoad.data};
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense: IExpense) => expense.id !== action.payLoad);
    default:
      return state;
  }
};
const ExpenseContextProvider = ({children}: any) => {
  const [expensesState, dispatch] = useReducer(expenseReducer, []);

  const addExpense = (data: IExpense) => {
    dispatch({type: 'ADD', payLoad: data});
  };

  const setExpenses = (expenses: IExpense) => {
    dispatch({type: 'SET', payLoad: expenses});
  };

  const deleteExpense = (id: number) => {
    dispatch({type: 'DELETE', payLoad: id});
  };

  const updateExpense = (id: number, data: IExpense) => {
    dispatch({type: 'UPDATE', payLoad: {id: id, data: data}});
  };

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpenseContextProvider;
