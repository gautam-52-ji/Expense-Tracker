import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import IconButton from '../components/UI/IconButton';
import {GLobalStyle} from '../constant/style';
import Button from '../components/UI/Button';
import {ExpensesContext} from '../store/expensesContext';
import _ from 'lodash';
import {deleteExpense, postRequest, updateExpense} from '../util/httpRequest';
import {IExpense} from './recentExpenses';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function ManageExpenses({route, navigation}: any) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [error, setError] = useState<string>('');
  const expenseCtx = useContext(ExpensesContext);
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const selectedExpense = expenseCtx.expenses.find(
    (expense: IExpense) => expense.id === expenseId,
  );
  const [amount, setAmount] = useState({
    value: _.isEmpty(selectedExpense) ? '' : selectedExpense.amount.toString(),
    isValid: true,
  });
  const [date, setDate] = useState({
    value: _.isEmpty(selectedExpense)
      ? ''
      : selectedExpense.date.toISOString().slice(0, 10),
    isValid: true,
  });
  const [description, setDescription] = useState({
    value: _.isEmpty(selectedExpense) ? '' : selectedExpense.description,
    isValid: true,
  });

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    try {
      await deleteExpense(expenseId);
      expenseCtx.deleteExpense(expenseId);
    } catch (e) {
      console.log('====================================');
      console.log(e);
      console.log('====================================');
      setError(prev => prev + 'Could not delete - please try again');
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }

    setTimeout(() => {
      navigation.goBack();
    }, 100);
  };

  const cancelHandler = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      navigation.goBack();
    }, 100);
  };
  const confirmHandler = async () => {
    const expenseData = {
      amount: +amount.value,
      date: new Date(date.value),
      description: description.value,
    };

    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = expenseData.date.toString() !== 'Invalid Date';
    const isDescriptionValid = expenseData.description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      setAmount({value: amount.value, isValid: isAmountValid});
      setDate({value: date.value, isValid: isDateValid});
      setDescription({value: description.value, isValid: isDescriptionValid});
      return;
    }
    setIsSubmitting(true);

    try {
      if (isEditing) {
        expenseCtx.updateExpense(expenseId, expenseData);
        await updateExpense(expenseId, expenseData);
      } else {
        const id = await postRequest(expenseData);
        expenseCtx.addExpense({...expenseData, id: id});
      }
      setTimeout(() => {
        navigation.goBack();
      }, 100);
    } catch (error) {
      setError('Could Not Save Data - Please Try Again Later !!');
      setIsSubmitting(false);
    }
  };

  const amountChangeHandler = (enteredAmount: string) => {
    setAmount({value: enteredAmount, isValid: true});
  };
  const dateChangeHandler = (enteredDate: string) => {
    setDate({value: enteredDate, isValid: true});
  };

  const descriptionChangeHandler = (enteredDescription: string) => {
    setDescription({value: enteredDescription, isValid: true});
  };

  const errorHandler = () => {
    setError('');
  };
  if (error != '' && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  const isFormValid = !amount.isValid || !date.isValid || !description.isValid;
  return (
    <View style={style.mainView}>
      <View style={style.formView}>
        <Text style={style.titleText}>Your Expense</Text>
        <View style={style.rowInputView}>
          <View style={[style.inputView, style.rowInput]}>
            <Text
              style={[style.labelText, !amount.isValid && style.inValidLabel]}>
              Amount
            </Text>
            <TextInput
              style={[style.input, !amount.isValid && style.invalidInput]}
              keyboardType="decimal-pad"
              onChangeText={amountChangeHandler}
              value={amount.value}
            />
          </View>
          <View style={[style.inputView, style.rowInput]}>
            <Text
              style={[style.labelText, !date.isValid && style.inValidLabel]}>
              Date
            </Text>
            <TextInput
              style={[style.input, !date.isValid && style.invalidInput]}
              placeholder="YYYY-MM-DD"
              maxLength={10}
              keyboardType="number-pad"
              onChangeText={dateChangeHandler}
              value={date.value}
            />
          </View>
        </View>
        <View style={style.inputView}>
          <Text
            style={[
              style.labelText,
              !description.isValid && style.inValidLabel,
            ]}>
            Description
          </Text>
          <TextInput
            style={[
              style.input,
              style.multiLineInput,
              !description.isValid && style.invalidInput,
            ]}
            multiline
            autoCapitalize="words"
            maxLength={30}
            onChangeText={descriptionChangeHandler}
            value={description.value}
          />
        </View>
      </View>
      {isFormValid && (
        <Text style={style.errorText}>
          Invalid Input Values - Please Check Your Entered Data!
        </Text>
      )}
      <View style={style.buttonView}>
        <Button styles={style.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button styles={style.button} onPress={confirmHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
      {isEditing && (
        <View style={style.deleteView}>
          <IconButton
            icon="trash"
            color={GLobalStyle.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenses;

const style = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 24,
    backgroundColor: GLobalStyle.colors.primary800,
  },
  formView: {
    marginTop: 40,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputView: {
    marginHorizontal: 4,
    marginVertical: 8,
  },

  labelText: {
    fontSize: 12,
    color: GLobalStyle.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GLobalStyle.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GLobalStyle.colors.primary700,
  },
  rowInputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  multiLineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },

  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteView: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GLobalStyle.colors.primary200,
    alignItems: 'center',
  },
  errorText: {
    color: GLobalStyle.colors.error500,
  },
  inValidLabel: {
    color: GLobalStyle.colors.error500,
  },
  invalidInput: {
    backgroundColor: GLobalStyle.colors.error50,
  },
});
