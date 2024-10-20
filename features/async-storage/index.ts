import AsyncStorage from '@react-native-async-storage/async-storage';
import { CallbackWithResult } from '@react-native-async-storage/async-storage/lib/typescript/types';
import { AsyncStorageKeys, AsyncStorageValue } from './async-storage.type';

const isJsonString = (str: string) => {
  try {
    const o = JSON.parse(str);
    if (o && typeof o === 'object') {
      return true;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const getAsyncStorage = async (
  key: AsyncStorageKeys,
  callback?: CallbackWithResult<string>
) => {
  try {
    const value = await AsyncStorage.getItem(key, callback);

    return value && isJsonString(value) ? JSON.parse(value) : value;
  } catch (error) {
    console.error('Error getting data from AsyncStorage', error);
  }
};

export const setAsyncStorage = async (
  key: AsyncStorageKeys,
  value: AsyncStorageValue,
  callback?: CallbackWithResult<string>
) => {
  try {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    await AsyncStorage.setItem(key, value, callback);
  } catch (error) {
    console.error('Error setting data to AsyncStorage', error);
  }
};
