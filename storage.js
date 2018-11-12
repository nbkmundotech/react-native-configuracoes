import {
  AsyncStorage
} from 'react-native';

export const salvarConfiguracao = async (propriedade, valor) => {
  try {
    await AsyncStorage.setItem(propriedade, valor);
  } catch(error) {
    console.error(error);
  }
};

export const carregarConfiguracao = async (propriedade) => {
  try {
     return await AsyncStorage.getItem(propriedade);
  } catch(error) {
    console.log(error);
    return null;
  }
};
