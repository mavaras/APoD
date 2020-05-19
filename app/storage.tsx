/* eslint-disable */
import AsyncStorage from '@react-native-community/async-storage';


const Storage = {
  getItem: async function (key: string) {
    try {
      const item = await AsyncStorage.getItem(key);
      if (item !== null) {
        return item;
      }
    } catch(error) {
      console.log(error);
    }
  },
  setItem: async function (key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  },
  removeItem: async function (key: string) {
    try {
      return await AsyncStorage.removeItem(key);
    } catch(error) {
      console.log(error);
    } 
  },
  clear: async function (key: string) {
    return await AsyncStorage.clear();
  }
};

export default Storage;
