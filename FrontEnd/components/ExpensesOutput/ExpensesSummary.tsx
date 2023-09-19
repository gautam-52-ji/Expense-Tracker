import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GLobalStyle} from '../../constant/style';

interface IExpensesSummary {
  expenses: any;
  periodName: string;
  navigation: any;
}
function ExpensesSummary({expenses, periodName}: IExpensesSummary) {
  const expensesSum = expenses.reduce((sum: number, expense: any) => {
    return sum + expense.amount;
  }, 0);
  return (
    <View style={style.container}>
      <Text style={style.periodName}>{periodName}</Text>
      <Text style={style.sum}>₹{expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;

const style = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GLobalStyle.colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodName: {
    fontSize: 12,
    color: GLobalStyle.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GLobalStyle.colors.primary500,
  },
});
