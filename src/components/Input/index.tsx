import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';

import {Control, Controller} from 'react-hook-form';
import {Colors} from '../../assets/Colors';

export interface CustomInputProps {
  title: string;
  placeholder: string;
  control: Control<any, any>;
  name: string;
  inputProps?: any;
}

const CustomInput: React.FC<CustomInputProps> = ({
  title,
  placeholder,
  control,
  name,
  inputProps,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: true,
      }}
      render={({field: {onChange, onBlur, value}}) => {
        return (
          <View style={styles.container}>
            <Text style={styles.title}> {title} </Text>
            <TextInput
              {...inputProps}
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.inputBody}
            />
          </View>
        );
      }}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontWeight: '500',
    marginVertical: 5,
    color: Colors.black,
  },
  inputBody: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingLeft: 15,
  },
});
