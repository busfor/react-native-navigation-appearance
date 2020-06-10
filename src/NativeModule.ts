import { NativeModules } from 'react-native'

const { RNNAppearanceModule } = NativeModules

interface NativeModule {
  setDefaultNightMode(mode: number): void
  MODE_NIGHT_NO: number
  MODE_NIGHT_YES: number
  MODE_NIGHT_FOLLOW_SYSTEM: number
  DARK_MODE_SUPPORTS: boolean
  DEVICE_BRAND: string
}

export default RNNAppearanceModule as NativeModule
