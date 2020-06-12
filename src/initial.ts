import { StyleSheet } from 'react-native'
import { Options } from 'react-native-navigation'
import merge from 'deepmerge'

import { Appearance, NamedStyles, StylesType, ThemedOptions, DefaultOptions, StylesProps } from './types'
import { darkAppearanceXiaomiException } from './utils'
import { getCurrentAppearance } from './Context'

export const createStyles = <T extends NamedStyles<T>>(creator: StylesType<T>): { [s in Appearance]: T } => {
  const createdStyles: { [s in Appearance]?: T } = {}
  for (const appearance in Appearance) {
    if (Object.hasOwnProperty.call(Appearance, appearance)) {
      createdStyles[appearance as Appearance] = StyleSheet.create(creator({ appearance: appearance as Appearance }))
    }
  }
  return createdStyles as { [s in Appearance]: T }
}

export const createOptions = <T = {}>(optionsCreator: ThemedOptions<T>) => optionsCreator

/**
 * Creates default options wich you should pass to initAppearanceModule. Also you can you use it inside createOptions callback.
 * @param defaults - A function, wich returns themed default options.
 * @returns A function, wich returns merged default options with passed options
 */
export const createDefaultOptions = (defaults: (props: StylesProps) => Options): DefaultOptions => (
  props: StylesProps,
  options?: Options
): Options => {
  const defaultOptions = defaults(props)

  if (darkAppearanceXiaomiException) {
    defaultOptions.statusBar = undefined
  }

  if (options?.topBar?.backButton === undefined) {
    defaultOptions.topBar.backButton = undefined
  }

  if (options?.topBar?.leftButtons?.length === 0) {
    defaultOptions.topBar.leftButtons = []
  }

  if (options?.topBar?.leftButtons?.length) {
    defaultOptions.topBar.leftButtons = options.topBar.leftButtons
  }

  if (options?.topBar?.rightButtons?.length === 0) {
    defaultOptions.topBar.rightButtons = []
  }

  if (options?.topBar?.rightButtons?.length) {
    defaultOptions.topBar.rightButtons = options.topBar.rightButtons
  }

  if (options) {
    return merge(defaultOptions, options)
  }

  return defaultOptions
}

/**
 * Get initial options for current appearance
 * @param optionsCreator - Options creator from createOptions
 * @returns options
 */
export const initialOptions = <T>(optionsCreator: ThemedOptions<T>) => (passProps: T): Options => {
  const options = optionsCreator({ ...passProps, appearance: getCurrentAppearance() })
  if (darkAppearanceXiaomiException) {
    return { ...options, statusBar: undefined }
  }
  return options
}

export const createTheme = <T = {}>(appearances: { [s in Appearance]: T }) => appearances
