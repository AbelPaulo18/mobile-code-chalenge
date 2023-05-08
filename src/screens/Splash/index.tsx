import {View, StyleSheet, Image} from 'react-native';
import React, {useLayoutEffect} from 'react';

import {useDispatch} from 'react-redux';

import Logo from '../../assets/images/codeleap_logo_black.png';
import {Colors} from '../../assets/Colors';
import {exitSplash} from '../../redux/reducers/authSlice';

const SplashScreen = () => {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    setTimeout(() => {
      dispatch(exitSplash());
    }, 2000);
  }, []);
  return (
    <View style={styles.body}>
      <Image source={Logo} style={styles.logo} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  logo: {
    width: '80%',
    height: '10%',
  },
});
