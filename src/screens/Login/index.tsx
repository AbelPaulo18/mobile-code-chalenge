import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';

import {Colors} from '../../assets/Colors';
import CustomInput from '../../components/Input';
import CustomButton from '../../components/Button';
import {setAsyncStorageStringValue} from '../../utils';
import {changeAuthState} from '../../redux/reducers/authSlice';

type FormField = {
  username: string;
};

const LoginScreen = () => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<FormField>({});

  const handleRegisterUser = (data: FormField) => {
    setAsyncStorageStringValue(data.username);
    dispatch(changeAuthState(true));
  };

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to CodeLeap network!</Text>
        <CustomInput
          control={control}
          name="username"
          title="Please enter your username"
          placeholder="John Doe"
        />
        <View style={{alignSelf: 'flex-end'}}>
          <CustomButton
            handleOnPress={handleSubmit(handleRegisterUser)}
            disabled={watch('username') === '' || undefined ? true : false}
            title="ENTER"
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  container: {
    width: '90%',
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
});
