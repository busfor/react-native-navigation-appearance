import React, { memo, useContext } from 'react'
import { Text, SafeAreaView, View, Button } from 'react-native'
import {
  useAppearance,
  ThemeContext,
  useStyles,
  initialOptions,
  useThemedOptions,
  useThemeControls,
  Appearance,
} from '@busfor/react-native-navigation-appearance'

import stylesCreator from './styles'
import options from './options'

const AppScreen = memo(({ componentId }) => {
  useThemedOptions({}, options, componentId)

  const styles = useStyles(stylesCreator)
  const themeCtx = useContext(ThemeContext)
  const appearance = useAppearance()
  const { setManualAppearance, setUseSystemAppearance } = useThemeControls()

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>appearance: {appearance}</Text>
        <Text style={styles.text}>{JSON.stringify(themeCtx.state, null, 2)}</Text>
      </View>
      <Text style={styles.text}>Choose manual appearance:</Text>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title='light' onPress={() => setManualAppearance(Appearance.light)} />
        </View>
        <View style={styles.button}>
          <Button title='dark' onPress={() => setManualAppearance(Appearance.dark)} />
        </View>
      </View>
      <Text style={styles.text}>Choose theme:</Text>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title='system' onPress={() => setUseSystemAppearance(true)} />
        </View>
        <View style={styles.button}>
          <Button title='manual' onPress={() => setUseSystemAppearance(false)} />
        </View>
      </View>
    </SafeAreaView>
  )
})

AppScreen.options = initialOptions(options)

export default AppScreen
