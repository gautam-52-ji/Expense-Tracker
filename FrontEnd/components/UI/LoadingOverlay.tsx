import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {GLobalStyle} from '../../constant/style';

function LoadingOverlay() {
  return (
    <View style={style.mainView}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}

export default LoadingOverlay;

const style = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GLobalStyle.colors.primary700,
  },
});
