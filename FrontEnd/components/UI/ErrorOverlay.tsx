import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {GLobalStyle} from '../../constant/style';
import Button from './Button';

interface IError {
  message: string;
  onConfirm: Function;
}
function ErrorOverlay({message, onConfirm}: IError) {
  return (
    <View style={style.mainView}>
      <Text style={[style.text, style.title]}>An Error Occurred!</Text>
      <Text style={style.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
}

export default ErrorOverlay;

const style = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GLobalStyle.colors.primary700,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
