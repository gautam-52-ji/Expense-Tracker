import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import {ExpensesContext} from '../store/expensesContext';
import moment from 'moment';
import {getRequest} from '../util/httpRequest';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

export interface IExpense {
  id?: string;
  amount: string | number;
  date: Date;
  description: string;
}
function RecentExpenses({navigation}: any) {
  const expenseCtx = useContext(ExpensesContext);

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchExpense() {
      setIsFetching(true);
      try {
        const expenses = await getRequest();
        expenseCtx.setExpenses(expenses);
      } catch (error) {
        setError('Unable to Fetch Expenses!');
      }
      setTimeout(() => {
        setIsFetching(false);
      }, 100);
    }
    fetchExpense();
  }, []);
  const errorHandler = () => {
    setError('');
  };
  if (error != '' && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }
  const recentExpenses = expenseCtx.expenses.filter((expense: any) => {
    const today = new Date();
    const date1 = moment(today);

    const daysDifference = date1.diff(expense.date, 'days');

    if (daysDifference <= 7 && expense.date <= today) {
      return expense;
    }
  });
  return (
    <View style={style.mainView}>
      <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod={'Last 7 Days'}
        navigation={navigation}
        text="No Expenses for the last 7 Days"
      />
    </View>
  );
}

export default RecentExpenses;

const style = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});
