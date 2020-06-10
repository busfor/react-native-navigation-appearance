import { createDefaultOptions } from '@busfor/react-native-navigation-appearance'
import { theme } from './theme'
import { Appearance } from '@busfor/react-native-navigation-appearance/dist/types'

export const defaultOptions = createDefaultOptions(({ appearance }) => ({
  statusBar: {
    style: appearance === Appearance.dark ? 'light' : 'dark',
    backgroundColor: theme[appearance].backgroundColor,
  },
  navigationBar: {
    backgroundColor: theme[appearance].backgroundColor,
  },
  topBar: {
    background: {
      color: theme[appearance].backgroundColor,
    },
    title: {
      color: theme[appearance].textColor,
    },
  },
  bottomTabs: {
    backgroundColor: theme[appearance].backgroundColor,
  },
  bottomTab: {
    textColor: theme[appearance].textColor,
    selectedTextColor: theme[appearance].primaryColor,
    iconColor: theme[appearance].textColor,
    selectedIconColor: theme[appearance].primaryColor,
  },
}))
