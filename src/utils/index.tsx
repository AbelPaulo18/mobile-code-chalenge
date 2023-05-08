import AsyncStorage from '@react-native-async-storage/async-storage';
import {asyncStorageKey} from './constants';

const getAsyncStorageData = async (): Promise<string | undefined> => {
  try {
    const value = (await AsyncStorage.getItem(asyncStorageKey)) as string;
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.error(e.message);
  }
};

const setAsyncStorageStringValue = async (value: string) => {
  try {
    await AsyncStorage.setItem(asyncStorageKey, value);
  } catch (e) {
    console.error(e.message);
  }

  console.log('Done.');
};

const removeAsyncStorageValue = async () => {
  try {
    await AsyncStorage.removeItem(asyncStorageKey);
  } catch (e) {
    console.error(e.message);
  }
};

export {
  getAsyncStorageData,
  removeAsyncStorageValue,
  setAsyncStorageStringValue,
};
