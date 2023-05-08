import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Provider} from 'react-redux';

import RootStack from './Root';
import {store} from '../redux/store';

const Stack = createNativeStackNavigator<RouterStackParamList>();
const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

export type RouterStackParamList = {
  RootStack: undefined;
};

const Router = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="RootStack"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="RootStack" component={RootStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Router;
