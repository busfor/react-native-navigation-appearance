import { Platform, Appearance as RNAppearance } from 'react-native'

import { Appearance } from './types'
import NativeModule from './NativeModule'

const isIOS13 = Platform.OS === 'ios' && parseInt(String(Platform.Version), 10) >= 13

export const darkAppearanceXiaomiException =
  NativeModule.DEVICE_BRAND === 'Xiaomi' && (Platform.Version === 26 || Platform.Version === 27)

export const isDarkAppearanceAvailable = Platform.select({
  ios: parseInt(String(Platform.Version), 10) >= 12,
  android: !darkAppearanceXiaomiException,
  default: false,
})

export const isAutomaticDarkAppearanceAvailable = Platform.select({
  ios: isIOS13,
  android: Platform.Version >= 28,
  default: false,
})

export const initialAppearance = RNAppearance.getColorScheme() as Appearance
