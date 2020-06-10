import AsyncStorage from '@react-native-community/async-storage'

import { AppearanceState } from './types'

const STORAGE_KEY = 'RNN_THEME'

export default {
  getState: () => AsyncStorage.getItem(STORAGE_KEY),
  setState: (newState: AppearanceState) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState)).catch(() => {})
  },
}
