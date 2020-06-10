import { useState, useEffect } from 'react'
import { useColorScheme, Platform, Appearance as RNAppearance, DeviceEventEmitter } from 'react-native'

import { Appearance } from '../types'

const useDeviceAppearance = (): Appearance => {
  const colorScheme = useColorScheme()
  const [colorSchemeAndroid, setColorSchemeAndroid] = useState(RNAppearance.getColorScheme() as Appearance)

  useEffect(() => {
    if (Platform.OS === 'android') {
      const currentModeListener = DeviceEventEmitter.addListener('currentModeChanged', (mode: Appearance) => {
        setColorSchemeAndroid(mode)
      })
      return () => currentModeListener.remove()
    }
  }, [])

  return Platform.OS === 'ios' ? (colorScheme as Appearance) : colorSchemeAndroid
}

export default useDeviceAppearance
