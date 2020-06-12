import { useEffect, useRef } from 'react'
import { Navigation } from 'react-native-navigation'
import { Platform } from 'react-native'

import { ThemedOptions } from '../types'
import { darkAppearanceXiaomiException } from '../utils'

import useAppearance from './useAppearance'

/**
 * Updates options when changing appearance
 * @param passProps - Passed props to the current screen, which uses in the options (such as title, etc.)
 * @param optionsCreator - Options creator from createOptions
 * @param componentId - current screen componentId
 * @returns options
 */
const useThemedOptions = <T>(passProps: T, optionsCreator: ThemedOptions<T>, componentId: string): void => {
  const appearance = useAppearance()
  const firstUpdate = useRef(true)

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }

    const options = optionsCreator({ ...passProps, appearance })
    const bottomTabs = options.bottomTabs
    Navigation.mergeOptions(componentId, darkAppearanceXiaomiException ? { ...options, statusBar: undefined } : options)
    // bug fix for bottom tabs changes on android
    if (Platform.OS === 'android' && bottomTabs) {
      Navigation.mergeOptions(componentId, { bottomTabs })
    }
  }, [appearance])
}

export default useThemedOptions
