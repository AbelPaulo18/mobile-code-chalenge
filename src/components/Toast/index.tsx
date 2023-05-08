import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import {useDispatch} from 'react-redux';

import * as Animatable from 'react-native-animatable';

import {Colors} from '../../assets/Colors';
import {toggleToastState} from '../../redux/reducers/reloadSlice';

interface ToastProps {
  message: string;
  success?: boolean;
}

const CustomToast = ({message, success}: ToastProps) => {
  const dispatch = useDispatch();
  setTimeout(() => {
    dispatch(toggleToastState(false));
  }, 3100);
  return (
    <Animatable.View
      animation={'bounceIn'}
      duration={1500}
      style={styles.container}>
      <Text style={styles.txt}> {message} </Text>
      <View
        style={[
          styles.toastLowerBar,
          {backgroundColor: !success ? Colors.green : Colors.red},
        ]}
      />
    </Animatable.View>
  );
};

export default CustomToast;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    top: 15,
    zIndex: 10,
    elevation: 10,
    width: '90%',
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingTop: 10,
  },
  txt: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  toastLowerBar: {
    height: 10,
    width: '100%',
  },
});
