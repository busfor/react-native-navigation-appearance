import React, { memo } from 'react'
import { Text, SafeAreaView, View, Button, NativeModules } from 'react-native'
import {
  useAppearance,
  useStyles,
  initialOptions,
  useThemedOptions,
  getCurrentAppearance,
} from '@busfor/react-native-navigation-appearance'

const { RNNAppearanceModule } = NativeModules

import stylesCreator from './styles'
import options from './options'
import { Alert } from 'react-native'

const AnotherScreen = memo(({ componentId }) => {
  useThemedOptions({}, options, componentId)

  const appearance = useAppearance()
  const styles = useStyles(stylesCreator)

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>appearance: {appearance}</Text>
        <View style={styles.button}>
          <Button title='Show alert' onPress={() => Alert.alert('Hello!', 'Hello world!')} />
        </View>
        <View style={styles.button}>
          <Button title='test' onPress={() => console.log(RNNAppearanceModule)} />
        </View>
        <Button
          title='Get current appearance'
          onPress={() => Alert.alert('Current appearance sync:', getCurrentAppearance())}
        />
      </View>
    </SafeAreaView>
  )
})

AnotherScreen.options = initialOptions(options)

export default AnotherScreen
