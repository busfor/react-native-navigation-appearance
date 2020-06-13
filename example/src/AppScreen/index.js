import React, { memo } from 'react'
import { Text, SafeAreaView, View, Button } from 'react-native'
import {
  useAppearance,
  useStyles,
  initialOptions,
  useThemedOptions,
  useThemeControls,
  AppearanceMode,
} from '@busfor/react-native-navigation-appearance'

import stylesCreator from './styles'
import options from './options'

const AppScreen = memo(({ componentId }) => {
  useThemedOptions({}, options, componentId)

  const styles = useStyles(stylesCreator)
  const appearance = useAppearance()
  const { setAppearanceMode, currentApearanceMode } = useThemeControls()

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>appearance: {appearance}</Text>
        <Text style={styles.text}>current mode: {currentApearanceMode}</Text>
      </View>
      <Text style={styles.text}>Choose mode:</Text>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <View style={styles.button}>
            <Button title='system' onPress={() => setAppearanceMode(AppearanceMode.system)} />
          </View>
          <Button title='light' onPress={() => setAppearanceMode(AppearanceMode.light)} />
        </View>
        <View style={styles.button}>
          <Button title='dark' onPress={() => setAppearanceMode(AppearanceMode.dark)} />
        </View>
      </View>
    </SafeAreaView>
  )
})

AppScreen.options = initialOptions(options)

export default AppScreen
