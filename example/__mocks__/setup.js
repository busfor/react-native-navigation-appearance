import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'
import '@busfor/react-native-navigation-appearance/jest/rnn-appearance-mock'

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)

jest.useFakeTimers()
