import {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useDispatch, useSelector} from 'react-redux';
import {Provider} from 'react-redux';

import SplashScreen from '../screens/Splash';
import LoginScreen from '../screens/Login';
import HomeScreen from '../screens/Home';
import {RootState, store} from '../redux/store';
import {getAsyncStorageData} from '../utils';
import {changeAuthState} from '../redux/reducers/authSlice';

const Stack = createNativeStackNavigator<StackParamList>();

export type StackParamList = {
  SplashScreen: undefined;
  LoginScreen?: undefined;
  HomeScreen?: undefined;
};

const RootStack = () => {
  const dispatch = useDispatch();
  const {logged, splash} = useSelector((state: RootState) => state.auth);

  const handleVerifyStorage = async () => {
    let data = await getAsyncStorageData();
    let value = data ? true : false;
    dispatch(changeAuthState(value));
  };
  useEffect(() => {
    handleVerifyStorage();
  }, []);
  return (
    <NavigationContainer independent>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        {splash ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        ) : !logged ? (
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        ) : (
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
