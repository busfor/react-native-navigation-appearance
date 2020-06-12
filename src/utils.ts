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

/**
 * Choose styles or options depending on the appearance (works like a Platform.select)
 * @param appearance - appearance from props (see createStyles, createOptions, initialOptions)
 * @param values - Values for each appearance
 */
export const appearanceSelect = <T>(appearance: Appearance, values: { [s in Appearance]?: T }): T | undefined =>
  values[appearance] || undefined
