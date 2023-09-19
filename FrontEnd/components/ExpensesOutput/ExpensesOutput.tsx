import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import {GLobalStyle} from '../../constant/style';
import {IExpense} from '../../screens/recentExpenses';

interface IExpenseOutput {
  expenses: any;
  expensesPeriod: string;
  navigation: any;
  text: string;
}

function ExpensesOutput({
  expenses,
  expensesPeriod,
  navigation,
  text,
}: IExpenseOutput) {
  let content = <Text style={style.infoText}>{text}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} navigation={navigation} />;
  }
  return (
    <View style={style.container}>
      <ExpensesSummary
        expenses={expenses}
        periodName={expensesPeriod}
        navigation={navigation}
      />
      {content}
    </View>
  );
}

export default ExpensesOutput;

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: GLobalStyle.colors.primary700,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    marginTop: 32,
    textAlign: 'center',
  },
});
