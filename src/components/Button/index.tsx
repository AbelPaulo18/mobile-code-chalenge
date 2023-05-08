import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../../assets/Colors';

interface CustomButtonProps {
  title: string;
  outline?: boolean;
  style?: object;
  disabled: boolean;
  handleOnPress: () => void;
}

const CustomButton = ({
  title,
  outline,
  style,
  disabled,
  handleOnPress,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handleOnPress}
      disabled={disabled}
      style={[
        disabled
          ? styles.containerDeactivated
          : outline
          ? styles.containerSecondary
          : styles.containerPrimary,
        style,
      ]}>
      <Text style={outline ? styles.textSecondary : styles.textPrimary}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  containerPrimary: {
    paddingHorizontal: 25,
    paddingVertical: 5,
    backgroundColor: Colors.primary,
    marginVertical: 5,
    borderRadius: 5,
  },
  containerDeactivated: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: Colors.gray,
    marginVertical: 5,
    borderRadius: 5,
  },
  containerSecondary: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 5,
  },
  textPrimary: {
    color: Colors.white,
  },
  textSecondary: {
    color: Colors.black,
  },
});
