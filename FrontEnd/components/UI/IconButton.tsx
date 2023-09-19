import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IIconButton {
  icon: string;
  size: number;
  color: string;
  onPress: any;
}

function IconButton({icon, size, color, onPress}: IIconButton) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={style.mainView}>
        <Ionicons name={icon} size={size} color={color}></Ionicons>
      </View>
    </TouchableOpacity>
  );
}

export default IconButton;

const style = StyleSheet.create({
  mainView: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
});
