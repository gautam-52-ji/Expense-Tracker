import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import {ExpensesContext} from '../store/expensesContext';

function AllExpenses({navigation}: any) {
  const expenseCtx = useContext(ExpensesContext);
  return (
    <View style={style.mainView}>
      <ExpensesOutput
        expenses={expenseCtx.expenses}
        expensesPeriod={'Total'}
        navigation={navigation}
        text="No Expenses Found"
      />
    </View>
  );
}

export default AllExpenses;

const style = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});
