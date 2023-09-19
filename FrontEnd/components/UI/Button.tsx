import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {GLobalStyle} from '../../constant/style';

interface IButton {
  children?: any;
  onPress: any;
  mode?: string;
  styles?: any;
}

function Button({children, onPress, mode, styles}: IButton) {
  return (
    <View style={styles}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => pressed && style.pressed}>
        <View style={[style.button, mode === 'flat' && style.flat]}>
          <Text style={[style.buttonText, mode === 'flat' && style.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const style = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GLobalStyle.colors.primary500,
  },
  flat: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  flatText: {
    color: GLobalStyle.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GLobalStyle.colors.primary100,
    borderRadius: 4,
  },
});
