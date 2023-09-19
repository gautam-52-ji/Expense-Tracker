import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GLobalStyle} from '../../constant/style';
import moment from 'moment';
interface IExpenseItem {
  id: string;
  description: string;
  amount: number;
  date: Date;
  navigation: any;
}

function ExpenseItem({
  id,
  description,
  amount,
  date,
  navigation,
}: IExpenseItem) {
  const buttonHandler = () => {
    navigation.navigate('ManageExpenses', {
      expenseId: id,
    });
  };
  return (
    <TouchableOpacity onPress={buttonHandler}>
      <View style={style.mainView}>
        <View>
          <Text style={[style.textBase, style.description]}>{description}</Text>
          <Text style={style.textBase}>
            {moment(date).format('Do MMM YYYY')}
          </Text>
        </View>
        <View style={style.amountView}>
          <Text style={style.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ExpenseItem;

const style = StyleSheet.create({
  mainView: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GLobalStyle.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    shadowColor: GLobalStyle.colors.gray500,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.4,
  },

  textBase: {
    color: GLobalStyle.colors.primary50,
  },
  description: {
    fontSize: 15,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountView: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GLobalStyle.colors.primary500,
    fontWeight: 'bold',
  },
});
