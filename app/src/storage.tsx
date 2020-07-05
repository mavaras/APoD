/* eslint-disable */
import AsyncStorage from '@react-native-community/async-storage';
import { log } from './utils/utils';


const Storage = {
  getItem: async function (key: string) {
    try {
      const item = await AsyncStorage.getItem(key);
      if (item !== null) {
        return item;
      }
    } catch(error) {
      log(error);
    }
  },
  setItem: async function (key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      log(error);
    }
  },
  removeItem: async function (key: string) {
    try {
      return await AsyncStorage.removeItem(key);
    } catch(error) {
      log(error);
    } 
  },
  clear: async function (key: string) {
    return await AsyncStorage.clear();
  }
};

export default Storage;
