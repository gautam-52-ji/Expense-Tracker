import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import ExpenseItem from './ExpenseItem';
import {IExpense} from '../../screens/recentExpenses';

interface IExpenseList {
  expenses: any;
  navigation: any;
}

function ExpensesList({expenses, navigation}: IExpenseList) {
  return (
    <View style={style.mainView}>
      <FlatList
        data={expenses}
        renderItem={item => {
          return (
            <ExpenseItem
              id={item.item.id}
              description={item.item.description}
              amount={item.item.amount}
              date={item.item.date}
              navigation={navigation}
            />
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

export default ExpensesList;

const style = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});
