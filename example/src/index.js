import React from 'react'
import { Navigation } from 'react-native-navigation'
import { ThemeProvider, initAppearanceModule } from '@busfor/react-native-navigation-appearance'

import AppScreen from './AppScreen'
import AnotherScreen from './AnotherScreen'
import { defaultOptions } from './defaultOptions'

Navigation.registerComponent(
  'AppScreen',
  () => (props) => (
    <ThemeProvider>
      <AppScreen {...props} />
    </ThemeProvider>
  ),
  () => AppScreen
)

Navigation.registerComponent(
  'AnotherScreen',
  () => (props) => (
    <ThemeProvider>
      <AnotherScreen {...props} />
    </ThemeProvider>
  ),
  () => AnotherScreen
)

Navigation.events().registerAppLaunchedListener(async () => {
  await initAppearanceModule(defaultOptions)
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BOTTOM_TABS_LAYOUT',
        children: [
          {
            stack: {
              id: 'FIRST_TAB',
              children: [
                {
                  component: {
                    id: 'APP_SCREEN',
                    name: 'AppScreen',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('./icon.png'),
                  text: 'FIRST_TAB',
                },
              },
            },
          },
          {
            stack: {
              id: 'SECOND_TAB',
              children: [
                {
                  component: {
                    id: 'ANOTHER_SCREEN',
                    name: 'AnotherScreen',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('./icon.png'),
                  text: 'SECOND_TAB',
                },
              },
            },
          },
        ],
      },
    },
  })
})
