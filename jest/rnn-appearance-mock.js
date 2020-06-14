'use strict'

var ReactNative = require('react-native')

ReactNative.NativeModules.RNNAppearanceModule = {
  setDefaultNightMode: () => {},
  MODE_NIGHT_NO: 1,
  MODE_NIGHT_YES: 2,
  MODE_NIGHT_FOLLOW_SYSTEM: 3,
  DARK_MODE_SUPPORTS: true,
  DEVICE_BRAND: '',
}

exports.default = {}
